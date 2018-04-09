module.exports = app => {
    const mongoose = app.mongoose;
    const adminSchema = new mongoose.Schema({
        //管理员账号
        userName: {
            type: String
        },
        //密码
        password: {
            type: Number
        }              
    });
  
    return mongoose.model('Admin', adminSchema);
  }