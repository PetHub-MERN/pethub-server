const { Schema, model } = require("mongoose");

const adoptionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    announcer: {
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: [true, 'The announcer is required']
    }, 
    pets: {
      type: [Schema.Types.ObjectId], 
      ref: 'Pet'
    },
    location: {
      type: String,
      required: [true, 'The location is required']
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String,
      default: `https://via.placeholder.com/500x500?text=ADOPTION`
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Adoption = model("Adoption", adoptionSchema);

module.exports = Adoption;
