import { Request, Response, NextFunction } from 'express';
import { Club } from '../../models';
import { messageVietnamese } from '../../../utils/message';
import { cloudinary } from '../../../config/cloudinary';
import { makeSlug } from '../../../utils/slugify';

class ClubsControllers {
  // [POST] /api/club
  async createClub(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseClub {
        clubId: string;
        name: string;
        email: string;
        nickname: string;
        fanpage: string;
        founding: string;
        avatar: {
          photo: string;
          cloudinaryId: string;
        };
        slug: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const { clubId, clubName, email, nickname, fanpage, founding } = req.body;
      const result = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Avatar' });
      const requestBody: BaseClub = {
        clubId: clubId,
        name: clubName,
        email: email,
        nickname: nickname,
        fanpage: fanpage,
        founding: founding,
        avatar: {
          photo: result['secure_url'],
          cloudinaryId: result['public_id']
        },
        slug: makeSlug(clubName),
        editor: profileSession['userId'] as string
      };
      const newClub = new Club(requestBody);
      const savedClub = await newClub.save();
      req.flash('message', messageVietnamese.RES004B);
      res.redirect('/admin/clubs');
    } catch (error) {
      req.session.modalAccount = 'club';
      req.flash('error', messageVietnamese.RES004A);
      res.redirect('/admin/clubs');
    }
  }

  // [PATCH] /api/club/:id
  async updateClub(req: Request, res: Response, next: NextFunction) {
    try {
      interface BaseClubUpdate {
        clubId?: string;
        name?: string;
        email?: string;
        nickname?: string;
        fanpage?: string;
        founding?: string;
        avatar?: {
          photo?: string;
          cloudinaryId?: string;
        };
        slug?: string;
        editor: string;
      }
      const profileSession: any = req.user;
      const club = await Club.findById(req.params.id);
      const public_id = club?.avatar?.cloudinaryId;
      const { clubId, clubName, email, nickname, fanpage, founding } = req.body;
      const requestBody: BaseClubUpdate = {
        editor: profileSession['userId'] as string
      };
      if (req.file && public_id) {
        await cloudinary.v2.uploader.destroy(public_id.toString());
        const result = await cloudinary.v2.uploader.upload(req.file!.path, { folder: 'Avatar' });
        requestBody.avatar!.photo = result['secure_url'];
        requestBody.avatar!.cloudinaryId = result['public_id'];
      }
      if (clubId) {
        requestBody['clubId'] = clubId;
      }
      if (clubName) {
        requestBody['name'] = clubName;
        requestBody['slug'] = makeSlug(clubName);
      }
      if (email) {
        requestBody['email'] = email;
      }
      if (nickname) {
        requestBody['nickname'] = nickname;
      }
      if (fanpage) {
        requestBody['fanpage'] = fanpage;
      }
      if (founding) {
        requestBody['founding'] = founding;
      }
      await club!.updateOne({ $set: requestBody });
      req.flash('message', messageVietnamese.RES002B);
      res.redirect('/admin/clubs');
    } catch (error) {
      req.session.modalAccount = 'club';
      req.flash('error', messageVietnamese.RES002A);
      res.redirect('/admin/clubs');
    }
  }

  // [DELETE] /api/club/:id
  async deleteClub(req: Request, res: Response, next: NextFunction) {
    try {
      const club = await Club.findById(req.params.id);
      await club!.deleteOne();
      req.flash('message', messageVietnamese.RES003B);
      res.redirect('/admin/clubs');
    } catch (error) {
      req.flash('error', messageVietnamese.RES003A);
      res.redirect('/admin/clubs');
    }
  }
}

export default new ClubsControllers();
