import mongoose, { type Document, type Model, Schema } from "mongoose";
import Event from "./event.model";

export interface IBooking {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingDocument extends IBooking, Document {}

const bookingSchema = new Schema<IBookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // Basic email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Verify that the referenced event exists before saving
bookingSchema.pre("save", async function (next) {
  if (this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });

    if (!eventExists) {
      return next(new Error("Referenced event does not exist"));
    }
  }

  next();
});

// Index on eventId for efficient queries (e.g., finding all bookings for an event)
bookingSchema.index({ eventId: 1 });

const Booking: Model<IBookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<IBookingDocument>("Booking", bookingSchema);

export default Booking;
