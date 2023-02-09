import { Request, Response, NextFunction } from 'express';
import { Campus, Club } from '../../models';
import { messageVietnamese } from '../../../utils/message';
import { cloudinary } from '../../../config/cloudinary';
import { makeSlug } from '../../../utils/slugify';
import { makeUniqueID } from '../../../utils/uniqueID';
import { dataUri } from '../../../config/multer';
import { AccountSession } from '../../../types/Passport';

/**
 * @description Handle Club RestfulAPI
 * @author Merlin Le
 */

class ClubsControllers {
  /**
   * [POST] /api/club
   * @function createClub
   * @description Create a club
   */

  public async createClub(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseClub {
        clubId: string;
        name: string;
        email: string;
        nickname: string;
        fanpage: string;
        founding: string;
        campus: string;
        avatar: {
          photo: string;
          cloudinaryId: string;
        };
        slug: string;
        editor: string;
      }
      const accountSession: AccountSession = req.user!;
      const { clubName, email, nickname, fanpage, founding, campus } = req.body;
      const photo = dataUri(req).content;
      if (!photo) throw new Error('Not found image');
      const [result, campusQuery] = await Promise.all([cloudinary.v2.uploader.upload(photo, { folder: 'Avatar' }), Campus.findById(campus)]);
      const cityId = campusQuery?.shortId as string;
      const clubId = makeUniqueID('club', cityId, 4);
      const requestBody: BaseClub = {
        clubId: clubId,
        name: clubName,
        email: email,
        nickname: nickname,
        fanpage: fanpage,
        founding: founding,
        campus: campus,
        avatar: {
          photo: result['secure_url'],
          cloudinaryId: result['public_id']
        },
        slug: makeSlug(clubName),
        editor: accountSession['userId'] as string
      };
      const newClub = new Club(requestBody);
      await newClub.save();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES004B('câu lạc bộ'));
      res.redirect('/admin/clubs');
    } catch (error) {
      req.flash('modalClub', 'true');
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES004A('câu lạc bộ'));
      res.redirect('/admin/clubs');
    }
  }

  /**
   * [PATCH] /api/club/:id
   * @function updateClub
   * @description Update a club
   */

  public async updateClub(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseClubUpdate {
        clubId?: string;
        name?: string;
        email?: string;
        nickname?: string;
        fanpage?: string;
        founding?: string;
        campus?: string;
        avatar?: {
          photo?: string;
          cloudinaryId?: string;
        };
        slug?: string;
        editor: string;
      }
      const accountSession: AccountSession = req.user!;
      const club = await Club.findById(req.params.id);
      const public_id = club?.avatar?.cloudinaryId;
      const { clubName, email, nickname, fanpage, founding } = req.body;
      const requestBody: BaseClubUpdate = {
        editor: accountSession['userId'] as string
      };
      if (req.file && public_id) {
        await cloudinary.v2.uploader.destroy(public_id.toString());
        const result = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Avatar' });
        requestBody.avatar!.photo = result['secure_url'];
        requestBody.avatar!.cloudinaryId = result['public_id'];
      }
      if (clubName) {
        requestBody['name'] = clubName;
        requestBody['slug'] = makeSlug(clubName);
      }
      if (email) requestBody['email'] = email;
      if (nickname) requestBody['nickname'] = nickname;
      if (fanpage) requestBody['fanpage'] = fanpage;
      if (founding) requestBody['founding'] = founding;
      await club!.updateOne({ $set: requestBody });
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES002B('câu lạc bộ'));
      res.redirect('/admin/clubs');
    } catch (error) {
      req.flash('modalClub', 'true');
      req.flash('result', 'failed');
      req.flash('mesage', messageVietnamese.RES002A('câu lạc bộ'));
      res.redirect('/admin/clubs');
    }
  }

  /**
   * [DELETE] /api/club/:id
   * @function deleteClub
   * @description Remove a club
   */

  public async deleteClub(req: Request, res: Response, next: NextFunction) {
    try {
      const club = await Club.findById(req.params.id);
      await club!.deleteOne();
      req.flash('result', 'successfully');
      req.flash('message', messageVietnamese.RES003B('câu lạc bộ'));
      res.redirect('/admin/clubs');
    } catch (error) {
      req.flash('result', 'failed');
      req.flash('message', messageVietnamese.RES003A('câu lạc bộ'));
      res.redirect('/admin/clubs');
    }
  }
}

export default new ClubsControllers();
