import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import { jsPDF } from "npm:jspdf";

export const handler: Handlers = {

    async GET(req, ctx) {
      const doc = new jsPDF();

      const url = new URL(req.url);
      const urls = url.searchParams.getAll("url");      

      var i=0
      for(var imurl of urls){

        var getimage= await fetch("https://content-eu-central-1.knowunity.com/CONTENT/QUkhByURaHXRCSRtanFc_image_page_1.webp")
        var imageBuffer = await getimage.arrayBuffer();
        var image = new Uint8Array(imageBuffer);
  

        var getimage= await fetch(imurl)
        var imageBuffer = await getimage.arrayBuffer();
        var image = new Uint8Array(imageBuffer);
        doc.addImage(image, 'WEBP', 0, 0, 210, 297, "page"+i);
        doc.addPage();

        i++
      }
      const pdfOutput = doc.output('arraybuffer');
      const pdfData = new Uint8Array(pdfOutput);
      const headers = new Headers({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=a4.pdf"
      });
      return new Response(pdfData, {
        status: 200,
        headers
      });
      // Get the PDF 
    },
  };

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
