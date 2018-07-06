import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
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
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.upsertGoogleUser = function (accessToken, refreshToken, profile, cb) {
  const profileObj = profile;
  return this.findOne({
    'googleProvider.id': profile.id,
  }, (err, user) => {
    if (!user) {
      const newUser = new this({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken,
        },
        picture: Object.values(profileObj).slice(-1)[0].picture,
      });

      newUser.save((error, savedUser) => {
        if (error) {
          return cb(error);
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
