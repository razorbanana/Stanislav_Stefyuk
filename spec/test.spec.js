import { Dropbox } from 'dropbox'
import fs from 'fs'

const ACCESS_TOKEN = 'sl.BU8ynWNQIq7iWUkotJCDu-l2TsUvSWFHbXonESr4b0SyGPJelcwM5I9TDKT2dN8stwnjoMdHwMvKPsG_4kS2ZF04y8yUn-I0DpNZfVkIdM9ZrbeDAvseQxfi5_4GzvzTVNemZc7wgWXc'

const dbx = new Dropbox({
    accessToken: ACCESS_TOKEN
})

const uploadFile = async (path) => {
    let fsPath = '.' + path
    let result
    let stats = fs.statSync(fsPath)
    if (stats.size/(1024*1024) < 150){
        try{
            result = await dbx.filesUpload({path:path})
            return result
        }catch(error){
            console.log(`Get error while uploading file: ${error}`)
        }   
        
    }else{
        try{
            let data = await fs.promises.readFile(fsPath)
            
            data.size = stats.size

            const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size

            var workItems = [];     
        
            var offset = 0;

            while (offset < data.size) {
                var chunkSize = Math.min(maxBlob, data.size - offset);
                workItems.push(data.subarray(offset, offset + chunkSize));
                offset += chunkSize;
            } 

            return workItems.reduce((acc, blob, idx, items) => {
                if (idx == 0) {
                    // Starting multipart upload of file
                    return acc.then(function() {
                        return dbx.filesUploadSessionStart({ close: false, contents: blob})
                        .then(response => {
                            console.log(response.result)
                            return response.result.session_id
                        })
                    });          
                } else if (idx < items.length-1) {  
                    // Append part to the upload session
                    return acc.then(function(sessionId) {
                        console.log(sessionId)
                        var cursor = { session_id: sessionId, offset: idx * maxBlob };
                        return dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId); 
                    });
                } else {
                    // Last chunk of data, close session
                    return acc.then(async function(sessionId) {
                        var cursor = { session_id: sessionId, offset: maxBlob*(workItems.length-1) };
                        var commit = { path: path, mode: 'add', autorename: true, mute: false };              
                        return await dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });           
                    });
                }          
            }, Promise.resolve());    
        }catch(error){
            console.error(`Got an error trying to read the file: ${error.message}`);
        }
    }
}

let smallUploadResult = await uploadFile('/files/text.txt')
//let bigUploadResult = await uploadFile('/files/BigFile')
let smallMetadataResult = await dbx.filesGetMetadata({path:'/files/text.txt'})
//let bigMetadataResult = await dbx.filesGetMetadata({path:'/files/BigFile'})
let smallDeleteResult = await dbx.filesDeleteV2({path:'/files/text.txt'})
//let bigDeleteResult = await dbx.filesDeleteV2({path:'/files/BigFile'})

describe("Testing of DropBox API", ()=>{
    it("Uploading small file (<150 MB)", async () => {
        expect(smallUploadResult.status).toBe(200)
    })
    /*it("Uploading big file (>150 MB)", async () => {
        expect(bigUploadResult.status).toBe(200)
    })*/
    it("Getting metadata from small file", async () => {
        expect(smallMetadataResult.status).toBe(200)
    })
    /*it("Getting metadata from big file", async () => {
        expect(bigMetadataResult.status).toBe(200)
    })*/
    it("Deleting small file", async () => {
        expect(smallDeleteResult.status).toBe(200)
    })
    /*it("Deleting big file", async () => {
        expect(bigDeleteResult.status).toBe(200)
    })*/
})