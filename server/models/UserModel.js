import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String },
  email: {
    type: String, required: true, unique: true, trim: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  picture: {
    type: String,
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  const that = this;
  return this.findOne({
    'googleProvider.id': profile.id
  }, (err, user) => {
      // no user was found, lets create a new one
    if (!user) {
      const newUser = new this({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken,
        },
        picture: profile.json.picture,
      });
      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};


const User = mongoose.model('User', UserSchema);

export default User;
