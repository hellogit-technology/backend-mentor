import { Request, Response, NextFunction } from 'express';
import {Campus} from '../../models'

class CampusControllers {
  // [POST] /util/campus
  async createCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const newCampus = new Campus(req.body)
      const savedCampus = await newCampus.save()
      res.status(200).json({
        message: 'OK',
        data: savedCampus
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [PATCH] /util/campus/:id
  async updateCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = await Campus.findById(req.params.id)
      const updatedCampus = await campus!.updateOne({$set: req.body})
      res.status(200).json({
        message: 'OK',
        updatedData: updatedCampus
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [DELETE] /util/campus/:id
  async deleteCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = await Campus.findById(req.params.id)
      const updatedCampus =  await campus!.updateOne({$set: req.body})
      res.status(200).json({
        message: 'OK',
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [GET] /util/all-campus
  async getAllCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = await Campus.find({})
      res.status(200).json({
        message: 'OK',
        data: campus
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  // [GET] /util/campus/:id
  async getCampus(req: Request, res: Response, next: NextFunction) {
    try {
      const campus = await Campus.findById(req.params.id)
      res.status(200).json({
        message: 'OK',
        data: campus
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default new CampusControllers();
