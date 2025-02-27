export function getFileTypeFromUrl(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension) {
        return 'unknown';
    }

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
            return 'image';
        case 'mp4':
        case 'mkv':
        case 'avi':
        case 'mov':
            return 'video';
        case 'mp3':
        case 'wav':
        case 'flac':
            return 'audio';
        case 'pdf':
            return 'document';
        case 'txt':
        case 'md':
            return 'text';
        case 'zip':
        case 'rar':
        case '7z':
            return 'archive';
        default:
            return 'unknown';
    }
}

export const transformImage = (url = "", width= 100) => url;