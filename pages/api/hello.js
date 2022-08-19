// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// MATERI 6: API DASAR (json)
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// MATERI 6: API DASAR (string)
// export default function handler(req, res) {
//   res.status(200).end("Hello");
// }
