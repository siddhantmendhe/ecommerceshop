import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
export const genJsonToken=(res,userId)=>{
    const token = jwt.sign({ userId }, process.env.JWTCode
        , { expiresIn: '30d' }
      );
      //Set HTTP-Only cookie
      res.cookie('jwt',token,
          {
              httpOnly: true,
             
              sameSite:'strict',
              maxAge: 30*24*60*60*1000
          }
      )
}