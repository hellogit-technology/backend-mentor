import { Request, Response } from 'express';
import { ClubAccount } from '../../../models';
import { messageVietnamese } from '../../../../utils/message';
import { IAccountSession } from '../../../../interface/ISession';
import { IClubAccount } from '../../../../interface/IAccount';
import { IPagination } from '../../../../interface/IPagination';

class ClubAccountControllers {
  private CREATE_SUCCESS = messageVietnamese.RES004B('tài khoản club');
  private CREATE_FAILED = messageVietnamese.RES004A('tài khoản club');
  private UPDATE_SUCCESS = messageVietnamese.RES002B('tài khoản club');
  private UPDATE_FAILED = messageVietnamese.RES002A('tài khoản club');
  private DELETE_SUCCESS = messageVietnamese.RES003B('tài khoản club');
  private DELETE_FAILED = messageVietnamese.RES003A('tài khoản club');

  private responseMessage = (statusCode: number, message: string) => (req: Request, res: Response) => {
    return res.status(statusCode).json({
      status: statusCode,
      message: message
    });
  };

  public pagination = async(page: number, search?: string, limitItem = 15): Promise<IPagination> => {
    const regex = search ? new RegExp(`.*${search}.*`, 'i') : null;
    const searchCondition = regex ? { $or: [{ fullname: regex }, { email: regex }] } : {};
    const [accountsResult, totalItems] = await Promise.all([
      ClubAccount.find(searchCondition)
      .populate('campus')
      .populate('club')
      .populate('editor')
      .limit(limitItem)
      .skip(page * limitItem - limitItem),
      ClubAccount.countDocuments(searchCondition)
    ])
    return {
      data: accountsResult,
      current: page,
      pages: Math.ceil(totalItems / limitItem)
    }
  }

  // Create a club account
  public createAccount = async (req: Request, res: Response) => {
    try {
      const accountSession: IAccountSession = req.user!;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      const newAccount = new ClubAccount<IClubAccount>({
        fullname: fullname as string,
        email: email as string,
        schoolId: schoolId as string,
        campus: campus as string,
        role: role as number,
        club: club as string,
        editor: accountSession['userId'] as string
      });
      await newAccount.save();
      return this.responseMessage(200, this.CREATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.CREATE_FAILED);
    }
  };

  // Update a club account
  public updateAccount = async (req: Request, res: Response) => {
    try {
      const accountId = req.params.id;
      const accountSession: IAccountSession = req.user!;
      const { fullname, email, campus, role, club, schoolId } = req.body;
      const result = await ClubAccount.findByIdAndUpdate(accountId, {
        $set: {
          editor: accountSession['userId'] as string,
          ...(fullname && { fullname }),
          ...(email && { email }),
          ...(campus && { campus }),
          ...(role && { role }),
          ...(club && { club }),
          ...(schoolId && { schoolId })
        } as IClubAccount
      });
      if (!result) return this.responseMessage(404, this.UPDATE_FAILED);
      return this.responseMessage(200, this.UPDATE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.UPDATE_FAILED);
    }
  };

  // Delete a club account
  public deleteAccount = async (req: Request, res: Response) => {
    try {
      const accountId = req.params.id;
      const result = await ClubAccount.findByIdAndDelete(accountId);
      if (!result) return this.responseMessage(404, this.DELETE_FAILED);
      return this.responseMessage(200, this.DELETE_SUCCESS);
    } catch (error) {
      this.responseMessage(500, this.DELETE_FAILED);
    }
  };

  // Get all club account
  public getManyAccount = async(req: Request, res: Response) => {
    try {
      const search = req.query.search ? req.query.search as string : undefined
      const accountSession: IAccountSession = req.user!;
      const page = parseInt(req.query.page as string) || 1;
      const result = await this.pagination(page, search)
      const payload = {
        queryData: result.data,
        pagination: {
          endpoint: 'cadasd',
          current: result.current,
          pages: result.pages
        }
      }
      res.render('payload/club-account', { layout: false, payload, accountSession })
      res.end()
    } catch (error) {
      this.responseMessage(500, 'Something went wrong!') 
    }
  }

  // Get a club account
  public getOneAccount = async(req: Request, res: Response) => {
    try {
      const accountId = req.params.id;
      const accountsResult = await ClubAccount.findById(accountId).populate('club').populate('campus').populate('editor')
      res.status(200).json(accountsResult)
    } catch (error) {
      this.responseMessage(500, 'Something went wrong!') 
    }
  }
}

export default new ClubAccountControllers();
