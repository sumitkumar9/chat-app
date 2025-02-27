import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon } from '@mui/icons-material';


const RenderAttachment = ( file: string, url: string) => {
    switch (file) {
        case 'image':
            return <img src={transformImage(url, 200)} alt="attachment" style={{ width: '200px', height: "150px", objectFit: "contain" }} />;
        case 'video':
            return <video src={url} controls preload='none' style={{ width: '200px' }} />;
        case 'audio':
            return <audio src={url} controls />;
        case 'file':
            return (
                <a href={url} download>
                    Download File
                </a>
            );
        default:
            return <FileOpenIcon />;
    }
};

export default RenderAttachment;