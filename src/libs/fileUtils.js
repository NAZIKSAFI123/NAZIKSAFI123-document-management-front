import pdf from "../assets/types/pdf.png";
import docx from "../assets/types/docx.png";
import html from "../assets/types/html.png";
import txt from "../assets/types/txt.png";
import video from "../assets/types/video.png";
import xls from "../assets/types/xls.png";
import csv from "../assets/types/csv.png";
import unknown from "../assets/types/unknown.png";
import jpeg from "../assets/types/jpeg.png";
import jpg from "../assets/types/jpg.png";
import png from "../assets/types/png.png";
import audio from "../assets/types/audio.png";
import classFile from "../assets/types/class.png";
import dat from "../assets/types/dat.png";
import eps from "../assets/types/eps.png";
import exe from "../assets/types/exe.png";
import log from "../assets/types/log.png";
import mp3 from "../assets/types/mp3.png";
import ppt from "../assets/types/ppt.png";
import rar from "../assets/types/rar.png";
import zip from "../assets/types/zip.png";

const getFileTypeIcon = (fileType) => {
    switch (fileType) {
        case "application/pdf":
            return pdf;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return docx;
        case "text/html":
            return html;
        case "text/plain":
            return txt;
        case "video/mp4":
            return video;
        case "application/vnd.ms-excel":
            return xls;
        case "text/csv":
            return csv;
        case "image/jpeg":
            return jpeg;
        case "image/jpg":
            return jpg;
        case "image/png":
            return png;
        case "audio/mpeg":
            return audio;
        case "application/octet-stream":
            return classFile;
        case "application/octet-stream":
            return dat;
        case "application/postscript":
            return eps;
        case "application/octet-stream":
            return exe;
        case "text/plain":
            return log;
        case "audio/mpeg":
            return mp3;
        case "application/vnd.ms-powerpoint":
            return ppt;
        case "application/x-rar-compressed":
            return rar;
        case "application/zip":
            return zip;
        default:
            return unknown;
    }
};

export default getFileTypeIcon;
