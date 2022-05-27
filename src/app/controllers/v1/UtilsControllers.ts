import {Response, Request, NextFunction} from 'express'
import {Account, Campus, Position} from '../../models';
import bcrypt from 'bcrypt'

class UtilsControllers {

    //~ VALIDATION
    // [POST] /util/check-email
    async existEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, id} = req.body

            let queryDate: {
                email: string,
                deleted_at: Date | null,
                _id?: string
            } = {
                email: email,
                deleted_at: null
            }

            if(id) {
                queryDate['_id'] = id
            }

            const checkEmail = await Account.findOne(queryDate)

            if(checkEmail !== null) {
                return res.status(200).json(false)
            } 

            res.status(200).json(true)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [POST] /util/check-username
    async existUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, id} = req.body

            let queryDate: {
                username: string,
                deleted_at: Date | null,
                _id?: string
            } = {
                username: username,
                deleted_at: null
            }

            if(id) {
                queryDate['_id'] = id
            }

            const checkUsername = await Account.findOne(queryDate)

            if(checkUsername !== null) {
                return res.status(200).json(false)
            } 

            res.status(200).json(true)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    //~ CAMPUS
    // [POST] /util/campus
    async createCampus(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, address} = req.body

            // Create new campus
            const newCampus = new Campus({
                name: name,
                address: address
            })
            const savedCampus = await newCampus.save()

            res.status(200).json({
                message: 'Created Successfully',
                data: savedCampus
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /util/campus/:id
    async updateCampus(req: Request, res: Response, next: NextFunction) {
        try {
            const campusId = req.params.id
            const campus = await Campus.findById(campusId)
            await campus.updateOne({ $set: req.body})
            const updatedCampus = await Campus.findById(campusId)

            res.status(200).json({
                message: 'Updated Successfully',
                data: updatedCampus
            })
           
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /util/campus/:id
    async deleteCampus(req: Request, res: Response, next: NextFunction) {
        try {
            const campusId = req.params.id
            const campus = await Campus.findById(campusId)
            await campus.deleteOne()

            res.status(200).json('Deleted Successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }


    //~ ADMIN ACCOUNT
    // [POST] /util/admin
    async createAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password, email} = req.body
            const role = 'admin'

            // Hash password
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            // Create new admin
            const newAdmin = new Account({
                username: username,
                password: hashedPassword,
                email: email,
                role: role
            })
            const savedAdmin = await newAdmin.save()

            res.status(200).json({
                message: 'Created Successfully',
                data: savedAdmin
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /util/admin/:id
    async updateAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const accountId = req.params.id
            const {username, password, email} = req.body

            // Hash password
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const account = await Account.findById(accountId)
            await account.updateOne({ $set: {
                username: username,
                password: hashedPassword,
                email: email
            }})

            const updatedAccount = await Account.findById(accountId)

            res.status(200).json({
                message: 'Updated Successfully',
                data: updatedAccount
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /util/admin/:id
    async deleteAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const accountId = req.params.id
            const account = await Campus.findById(accountId)
            await account.deleteOne()

            res.status(200).json('Deleted Successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }


    //~ POSITION
    // [POST] /util/position
    async createPosition(req: Request, res: Response, next: NextFunction) {
        try {
            // Create new admin
            const newPosition = new Position({
                name: req.body.name
            })
            const savedPosition = await newPosition.save()

            res.status(200).json({
                message: 'Created Successfully',
                data: savedPosition
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /util/position/:id
    async updatePosition(req: Request, res: Response, next: NextFunction) {
        try {
            const positionId = req.params.id
            const position = await Position.findById(positionId)
            await position.updateOne({ $set: req.body})

            const updatedPosition = await Position.findById(positionId)

            res.status(200).json({
                message: 'Updated Successfully',
                data: updatedPosition
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /util/position/:id
    async deletePosition(req: Request, res: Response, next: NextFunction) {
        try {
            const positionId = req.params.id
            const position = await Position.findById(positionId)
            await position.deleteOne()

            res.status(200).json('Deleted Successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new UtilsControllers;
