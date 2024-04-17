import pdf from "../assets/types/pdf.png";
import docx from "../assets/types/docx.png";
import html from "../assets/types/html.png";
import txt from "../assets/types/txt.png";
import video from "../assets/types/video.png";
import xls from "../assets/types/xls.png";
import csv from "../assets/types/csv.png";
import unknown from "../assets/types/unknown.png";

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
        default:
            return unknown;
    }
};

export default getFileTypeIcon;
