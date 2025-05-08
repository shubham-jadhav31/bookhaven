// import Joi from "joi";

// // Validate middleware to use in userRoutes 
// // to validate input as per database scheme

// const bookScheme = Joi.object({
//     name: Joi.string().min(3).required(),
//     email: Joi.string().email().required(),
// });

// const validateUser = (req, res, next) {
//     const { error } = userScheme.validate(req.body);
//     if(error) 
//         return res.status(400).json({
//             status: 400,
//             message: error.details[0].message
//         });
//     next();
// };

// export default validateUser;