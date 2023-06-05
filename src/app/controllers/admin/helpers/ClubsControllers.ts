import { Request, Response } from 'express';
import { Campus, Club } from '../../../models';
import { IAccountSession } from '../../../../interface/ISession';
import { IClub } from '../../../../interface/IClub';
import { messageVietnamese } from '../../../../utils/message';
import { makeSlug } from '../../../../utils/slugify';
import uniqueID from '../../../../utils/uniqueID';
import handleImage from '../../../../utils/handleImage';
import { UploadApiResponse } from 'cloudinary'
import { IPagination } from '../../../../interface/IPagination';

class ClubsControllers {
  private CREATE_SUCCESS = messageVietnamese.RES004B('câu lạc bộ');
  private CREATE_FAILED = messageVietnamese.RES004A('câu lạc bộ');
  private UPDATE_SUCCESS = messageVietnamese.RES002B('câu lạc bộ');
  private UPDATE_FAILED = messageVietnamese.RES002A('câu lạc bộ');
  private DELETE_SUCCESS = messageVietnamese.RES003B('câu lạc bộ');
  private DELETE_FAILED = messageVietnamese.RES003A('câu lạc bộ');

  private responseMessage = (statusCode: number, message: string) => (req: Request, res: Response) => {
    return res.status(statusCode).json({
      status: statusCode,
      message: message
    });
  };

  public pagination = async(page: number, search?: string, limitItem = 15): Promise<IPagination> => {
    const regex = search ? new RegExp(`.*${search}.*`, 'i') : null;
    const searchCondition = regex ? { $or: [{ fullname: regex }, { email: regex }] } : {};
    const [clubResult, totalItems] = await Promise.all([
      Club.find(searchCondition)
      .populate('campus')
      .populate('club')
      .populate('editor')
      .limit(limitItem)
      .skip(page * limitItem - limitItem),
      Club.countDocuments(searchCondition)
    ])
    return {
      data: clubResult,
      current: page,
      pages: Math.ceil(totalItems / limitItem)
    }
  }

  // Create a club
  public createClub = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const { clubName, email, nickname, fanpage, founding, campus } = req.body;
      let cloudinaryResult: UploadApiResponse

      // Upload image and return url and id
      try {
        const photo = handleImage.dataUri(req).content;
        if (!photo) throw 'Error'
        const result = await handleImage.uploadMethod(photo, 'Avatar');
        if(!result) throw 'Error'
        cloudinaryResult = result
      } catch (exception) {
        return this.responseMessage(400, this.CREATE_FAILED);
      }

      // Transaction cloudinary
      try {
        // Make unique Id club
        const campusResult = await Campus.findById(campus)
        const cityId = campusResult?.shortId
        if(!cityId) throw 'Error' 
        const clubId = uniqueID.generateId('club', cityId, 4);
        if(!clubId) throw 'Error' 

        const newClub = new Club<IClub>({
          clubId: clubId as string,
          name: clubName as string,
          email: email as string,
          nickname: nickname as string,
          fanpage: fanpage as string,
          founding: founding as string,
          campus: campus as string,
          avatar: {
            photo: cloudinaryResult['secure_url'] as string,
            cloudinaryId: cloudinaryResult['public_id'] as string
          },
          slug: makeSlug(clubName) as string,
          editor: accountSession['userId'] as string
        });
        await newClub.save();
      } catch (exception) {
        await handleImage.deleteMethod(cloudinaryResult['public_id']) // Reset image
        return this.responseMessage(400, this.CREATE_FAILED);
      }

      return this.responseMessage(200, this.CREATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.CREATE_FAILED);
    }
  };

  // Update a club
  public updateClub = async(req: Request, res: Response) => {
    try {
      let cloudinaryId: string | undefined
      let avatar: { photo: string, cloudinaryId: string } | undefined

      const clubId = req.params.id
      const accountSession: IAccountSession = req.user!;
      const { clubName, email, nickname, fanpage, founding } = req.body;
  
      const clubResult = await Club.findById(clubId);
      const publicIdImage = clubResult?.avatar?.cloudinaryId;

      // Transaction cloudinary
      try {
        if (req.file) {
          // Update a new image
          const photo = handleImage.dataUri(req).content;
          if (!photo) throw 'Error';
          const cloudinaryResult = await handleImage.uploadMethod(photo, 'Avatar')
          if(!cloudinaryResult) throw 'Error'
          avatar!.photo = cloudinaryResult['secure_url'];
          avatar!.cloudinaryId = cloudinaryResult['public_id'];
          cloudinaryId = cloudinaryResult['public_id'] as string
        }
        
        const name = clubName ? clubName as string : undefined
        const slug = name ? makeSlug(name) : undefined
        const result = await Club.findByIdAndUpdate(clubId, {
          $set: {
            editor: accountSession['userId'] as string,
            ...(name && { name }),
            ...(slug && { slug }),
            ...(email && { email }),
            ...(nickname && { nickname }),
            ...(fanpage && { fanpage }),
            ...(founding && { founding }),
            ...(avatar && {
              'avatar.photo': avatar.photo,
              'avatar.cloudinaryId': avatar.cloudinaryId
            })
          } as IClub
        });
        
        if (!result) throw 'Error'
        if(cloudinaryId) return await handleImage.deleteMethod(publicIdImage!.toString())
      } catch (exception) {
        return this.responseMessage(400, this.UPDATE_FAILED);
      }
  
      return this.responseMessage(200, this.UPDATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    } 
  }

  // Delete a club
  public deleteClub = async(req: Request, res: Response) => {
    try {
      const clubId = req.params.id
      const result = await Club.findByIdAndDelete(clubId);
      if (!result) return this.responseMessage(400, this.DELETE_FAILED);
      const publicIdUpload = result?.avatar?.cloudinaryId;
      await handleImage.deleteMethod(publicIdUpload!.toString())
      return this.responseMessage(200, this.DELETE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.DELETE_FAILED);
    }
  }

  // Get all club 
  public getManyClub = async(req: Request, res: Response) => {
    try {
      const { search } = req.body
      const page = parseInt(req.query.page as string) || 1;
      const result = await this.pagination(page, search)
      res.status(200).json({
        data: result.data,
        current: result.current,
        pages: result.pages
      })
    } catch (error) {
      this.responseMessage(500, 'Something went wrong!') 
    }
  }

  // Get a club 
  public getOneClub = async(req: Request, res: Response) => {
    try {
      
    } catch (error) {
      this.responseMessage(500, 'Something went wrong!') 
    }
  }
}

export default new ClubsControllers();
