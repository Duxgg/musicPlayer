
// import prisma from '../../utils/prisma';
// import { Request, Response } from 'express';
// const getTrackById = async (req: Request , res: Response) => {
//   const keyword =
//     typeof req.query.keyword === 'string'
//       ? req.query.keyword
//       : Object.keys(req.query)[0] || '';
  
//   try {  
//     const song = await prisma.songs.findMany({
//       where: {
//         id:keyword
//       },
//       include:{ 
//          album:true
//       } 
//     });
 
//     res.json({ song });  
//   } catch (err) {
//     console.error(' error:', err);
//     res.status(500).json({ error: 'Fetch failed' });  
//   }    
// }   
 
// const getAlbumById = async (req: Request , res: Response) => {
//   const keyword =
//     typeof req.query.keyword === 'string'
//       ? req.query.keyword
//       : Object.keys(req.query)[0] || '';
  
//   try {  
//     const artists = await prisma.album.findMany({
//       where: {
//         id:keyword
//       },
//       include:{ 
//           albumArtists: {
//             include: {
//               artist: true,   
//             },
//           },
//           tracks:true 
//       } 
//     });
 
//     res.json({ artists });  
//   } catch (err) {
//     console.error(' error:', err);
//     res.status(500).json({ error: 'Fetch failed' });  
//   }    
// }   
 
// const getArtistId = async (req: Request , res: Response) => {
//   const keyword =
//     typeof req.query.keyword === 'string'
//       ? req.query.keyword
//       : Object.keys(req.query)[0] || '';
  
//   try {  
//     const artists = await prisma.artist.findUnique({
//       where: {
//         id:keyword
//       },
//       include:{
//           songArtists: {
//             select: {
//               song: true,   
//             },
//           },
//           albumArtists: {
//             select: {
//               album: true,   
//             },
//           },
//       } 
//     });
 
//     res.json(  artists  );  
//   } catch (err) {
//     console.error(' error:', err);
//     res.status(500).json({ error: 'Fetch failed' });  
//   }    
// }  
//  const searchByKeyword = async (req: Request , res: Response) => {
//   const keyword =
//     typeof req.query.keyword === 'string'
//       ? req.query.keyword
//       : Object.keys(req.query)[0] || '';

//   try {
//     const songs = await prisma.songs.findMany({
//       where: {
//         name: { contains: keyword, mode: 'insensitive' },
//       },
//        include: {
//         album: true,
//         songArtists: {
//           include: {
//             artist: true,
//           },
//         },
//       },
//     });

//     const albums = await prisma.album.findMany({
//       where: {
//         name: { contains: keyword, mode: 'insensitive' },
//       },
//       include: {
//         albumArtists: {
//           include: { artist: true },
//         },
//       },
//     });

//     const artists = await prisma.artist.findMany({
//       where: {
//         name: { contains: keyword, mode: 'insensitive' },
//       },
//     });
 
//     res.json({ songs, albums, artists });  
//   } catch (err) {
//     console.error('Search error:', err);
//     res.status(500).json({ error: 'Search failed' });  
//   }
// };

// const getTopSongsByArtist = async (req: Request, res: Response) => {
//   const artistId =
//     typeof req.query.artistId === 'string'
//       ? req.query.artistId
//       : Object.keys(req.query)[0] || '';

//   try {  
//     const topSongIds = await prisma.artist.findFirst({
//       where: {
//         id: artistId
//       }, 
//     });
//     const songs = await prisma.songs.findMany({
//       where: {
//         id: { in: topSongIds?.topSongIds.slice(0, 5) },
//       },
//       include: {
//         album: true,
//         songArtists: {
           
//           select: {
//             artist: {
//               select: {
//                 name: true,
//                 id:true, 
//               },
//             },
//           },
//         }, 
//       },
//     });

//     res.json(  songs  );
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Fetch failed' });
//   }
// };
 
 
// export{getTrackById,getAlbumById,getArtistId,searchByKeyword,getTopSongsByArtist} 