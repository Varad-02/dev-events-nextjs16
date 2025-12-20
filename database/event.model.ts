import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventDocument extends IEvent, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate URL-friendly slug from title and normalize date/time formats
/* eslint-disable @typescript-eslint/no-explicit-any */
eventSchema.pre("save" as any, function (this: IEventDocument, next: (err?: Error) => void) {
/* eslint-enable @typescript-eslint/no-explicit-any */
  // Generate slug only if title is new or modified
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, "") + "-" + Date.now(); // Remove leading/trailing hyphens and append timestamp
  }

  // Normalize date to ISO format (YYYY-MM-DD) if modified
  if (this.isModified("date")) {
    // Expect ISO format YYYY-MM-DD or validate/convert other formats explicitly
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(this.date.trim())) {
      next(new Error("Date must be in YYYY-MM-DD format"));
      return;
    }

    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      next(new Error("Invalid date format"));
      return;
    }
    this.date = parsedDate.toISOString().split("T")[0];
  }

  // Normalize time to HH:MM AM/PM format if modified
  if (this.isModified("time")) {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    if (!timeRegex.test(this.time.trim())) {
      next(new Error("Time must be in format HH:MM AM/PM"));
      return;
    }
    // Normalize spacing and capitalization
    this.time = this.time.trim().replace(/\s+/g, " ").toUpperCase();
  }

  // All validations passed
  next();

});

// Create unique index on slug for fast lookups
eventSchema.index({ slug: 1 }, { unique: true });

const Event: Model<IEventDocument> =
  mongoose.models.Event || mongoose.model<IEventDocument>("Event", eventSchema);

export default Event;
