const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');

app.get('/convert/:url', (req, res) => {
  const url = req.params.url;  // Get YouTube URL from request

  // Download YouTube video using youtube-dl  
  youtubedl(url, {}, function(err, info) {
    if (err) {
      res.send(err);
    } else {
      // Initialize ffmpeg  
      const process = new ffmpeg(); 

      // Set input and output files
      process.input(info.filename)
             .outputOptions('-vcodec h264')   // Set video codec
             .outputOptions('-b:v 800k') // Set bitrate
             .outputOptions('-acodec aac')   // Set audio codec
             .outputOptions('-ar 44100')  // Set audio sample rate
             .output('video.mp4')  // Output TikTok compatible MP4 file

      // Start conversion  
      process.run(function(err, files) {
        if(!err) {
           res.send('Successfully converted!'); 
        } else {
           res.send(err);
        }
      });
    }  
  });
});
