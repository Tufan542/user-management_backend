const User = require("./user.model.js");
const Errors = require("../../utils/exceptions/index.js");

const getAllUsers = async (req, res) => {
  const { data: users } = (await User.find({ isDeleted: false })).select("id username email");
  res.json({
    users,
  });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const filter ={
    id:id,
    isDeleted:false
  }
  const { data: user } = (await User.findOne(filter)).select(
    "-password -isDeleted"
  );
  if (!user) throw new Errors.NotFound("user not found");
  res.json({
    user,
  });
};

const updateUser = async (req, res) => {
  const { password, ...payload } = req.body;
  const { id } = req.params;
 
    const { data: user } = await User.findOneAndUpdate({ id, isDeleted: false }, payload);
    return res.json({
      user,
    });
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const filter ={
    id:id,
    isDeleted:false
  }
const {data:user} = await User.findOne(filter)
if(!user){ return res.status(404).json({message:"user not present"})
}else{
  const deletepaylode={
    isDeleted:true
  }
 const {data:user} = await User.findOneAndUpdate(filter,deletepaylode)
}
  res.json({
    message: "Delete User",
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};