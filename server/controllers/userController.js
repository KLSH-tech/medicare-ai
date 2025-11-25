import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.js";
import crypto from 'crypto';
import { sendResetEmail } from "../configs/email.js";


// generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// api to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      //  Return 400 status code for client errors
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    const user = await User.create({ 
      name, 
      email, 
      password,
      credits: "5" // Give initial credits
    })

    const token = generateToken(user._id)
    
    // Return user data along with token
    res.status(201).json({ 
      success: true, 
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// api to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email })
    
    if (!user) {
      // Return 401 for authentication failures
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      // Return 401 for wrong password
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      })
    }

    const token = generateToken(user._id);
    
    //  Return user data along with token
    return res.status(200).json({ 
      success: true, 
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// api to get user data
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    
    // Return clean user object without password
    return res.status(200).json({ 
      success: true, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits
      }
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// api to get published images
export const getPublishedImages = async (req, res) => {
  try {
    const publishedImageMessages = await Chat.aggregate([
      { $unwind: "$messages" },
      {
        $match: {
          "messages.isImage": true, 
          "messages.isPublished": true
        }
      },
      {
        $project: {
          _id: 0,
          imageUrl: "$messages.content",
          userName: "$userName"
        }
      },
    ])

    res.status(200).json({ 
      success: true, 
      images: publishedImageMessages.reverse() 
    })
  } catch (error) {
    console.error('Get published images error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "No account found with that email" 
      });
    }
    
    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    
    // Send email
    try {
      await sendResetEmail(user.email, resetToken, user.name);
      
      res.status(200).json({ 
        success: true, 
        message: "Password reset email sent! Check your inbox." 
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      
      return res.status(500).json({ 
        success: false, 
        message: "Email could not be sent. Please try again later." 
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  try {
    // Hash token to compare with stored hash
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired reset token" 
      });
    }
    
    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.status(200).json({ 
      success: true, 
      message: "Password reset successful! You can now login." 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
