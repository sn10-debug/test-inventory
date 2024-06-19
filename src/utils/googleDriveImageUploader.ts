import axios from "axios";

import {google} from "googleapis"

import {Readable} from "stream"


export async function storeInGoogleDrive(folder_name:any, image_name:any, imageraw:any) {
    const refresh_token = process.env.REFRESH_TOKEN;
    const redirect_url = "https://developers.google.com/oauthplayground";
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_url
    );
  
    oauth2Client.setCredentials({
      refresh_token: refresh_token,
    });
  
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
  
    folder_name = folder_name ? folder_name : "Unknown Folder";
    let response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folder_name}' and trashed = false`,
      fields: "files(id, name)",
    });
    let folder;
    let folder_id = "";
  
    if (response.data.files && response.data.files.length > 0) {
      folder = response.data.files[0];
      console.log("Folder ID: ", folder.id);
      folder_id = folder.id ? folder.id : "";
    } else {
      try {
        folder = await drive.files.create({
          requestBody: {
            name: folder_name,
            mimeType: "application/vnd.google-apps.folder",
          },
          fields: "id",
        });
        console.log("Folder ID: ", folder.data.id);
        folder_id =folder.data.id ?  folder.data.id : "";
      } catch (e) {
        console.log(e);
        return;
      }
    }
  
    try {
      const response = await drive.files.create({
        requestBody: {
          name: `${image_name ? image_name : "Unknown"}.jpg`,
          mimeType: "image/jpg",
          parents: [folder_id],
        },
        media: {
          mimeType: "image/jpg",
        //   Readable.from(imageraw, "binary")
          body: Readable.from(imageraw),
        },
      });
      console.log(`Image uploaded for folder_id : ${folder_id}}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
  
// export async function getImage(imageURL:string) {
//     let image = await axios({
//       method: "get",
//       // url: "https://i.etsystatic.com/6325707/r/il/bc88b4/5321186445/il_fullxfull.5321186445_n2jp.jpg",
//       url: imageURL,
//       responseType: "arraybuffer",
//     })
//       .then((response) => {
//         return response;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
  
//     return image;
//   }
  