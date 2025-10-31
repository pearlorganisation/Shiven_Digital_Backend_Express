import cors from "cors";

const isDev = () => process.env.NODE_ENV === "development";

const getAllowedOrigins = () => {
  if (isDev()) {
    return ["http://localhost:5173","http://localhost:4173"];
  } else {
    return [
      "http://chicku.in/",
      "http://chicku.info",
    ];
  }
};

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

export default cors(corsOptions);
