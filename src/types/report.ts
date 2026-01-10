export type GeoJSONReportsResponse = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties: {
      id: string;
      severity: string;
      imageUrl: string;
      description: string;
      reportType: string;
      status: string;
      eventDate: string;
      eventTime: string;
      userName: string;
      userPhone: string;
      timestamp: string;
      user: string;
    };
  }>;
};










// export type GeoJSONReportsResponse = {
//   type: "FeatureCollection";
//   features: Array<{
//     type: "Feature";
//     geometry: {
//       type: "Point";
//       coordinates: [number, number]; // [lng, lat]
//     };
//     properties: {
//       id: string;
//       severity: string;
//       imageUrl: string;
//       description: string;
//       reportType: string;
//       status: string;
//       eventDate: string; // "2026-01-10"
//       eventTime: string; // "23:05"
//       userName: string;
//       userPhone: string;
//       timestamp: string;
//       user: string;
//     };
//   }>;
// };

// ✅ UI Model (jo aap table me show karoge)
export type Report = {
  id: string;          // backend id
  srNo: number;        // table serial number
  location: string;    // (abhi backend location nahi de raha)
  date: string;
  time: string;
  reportType: string;
  status: string;
  severity: string;
  imageUrl: string;
  description: string;
  userName: string;
  userPhone: string;
  lat: number;
  lng: number;
};
