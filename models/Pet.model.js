const { Schema, model } = require("mongoose");
const User = require("./User.model");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'The date of birth is required']
    },
    species: {
      type: String,
      enum: ['Dog', 'Cat', 'Bird', 'Reptile', 'Fish', 'Other'],
      required: [true, 'The species is required']
    },
    breed: {
      type: String,
      required: [true, 'The breed is required']
    }, 
    description: {
      type: String
    }, 
    owner: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'The pet needs to belong to someone']
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
