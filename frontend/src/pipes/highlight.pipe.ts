import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): SafeHtml {
    // Check if value is a string
    if (typeof value !== 'string') {
      console.warn('HighlightPipe expects a string value, but received:', value);
      return ''; // Return empty string if not a string
    }

    // Split the value into lines
    const lines = value.split('\n');

    let formattedValue = '';
    let insideCodeBlock = false;
    let codeBlockContent = '';
    let codeLanguage = '';

    lines.forEach(line => {
      // Handle multi-line code block (triple backticks)
      if (/^```/.test(line)) {
        if (insideCodeBlock) {
          // Close code block and format
          formattedValue += `
            <pre>
              <code style="background-color: #f9f9f9; border: 1px solid #e3e3e3; border-radius: 10px; flex-direction: column;display: flex;padding: 0 20px 20px 20px; white-space: pre-wrap">
                <span style="color: #8e8484; font-size: 0.75rem !important;!i;!; padding: 8px 0px;">${codeLanguage}</span>\n
                <span style = "padding: 10px 0px; line-height: 1.5;">${codeBlockContent.trim() ? codeBlockContent.trim() : "Error in Requesting prompt from server."}</span>
              </code>
            </pre>`;
          codeBlockContent = '';
          insideCodeBlock = false;
        } else {
          // Start code block, extract language if present
          const match = line.match(/^```(\w*)/);
          if (match && match[1]) {
            codeLanguage = match[1]; // Extract language (e.g., python, javascript)
          } else {
            codeLanguage = 'plaintext';
          }
          insideCodeBlock = true;
        }
      } else if (insideCodeBlock) {
        // Accumulate lines inside code block
        codeBlockContent += `${line}\n`;
      } else {
        // Handle regular content

        // Bold text: **bold**
        line = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        
        // Inline code: `code`
        line = line.replace(
          /`([^`]+)`/g,
          `<code style="background-color: #ececec; padding: 4px 3px; border-radius: 3px; font-family: monospace; font-weight: 100;">$1</code>`
        );

        // Headings: # Heading (must be at the start of the line)
        if (/^#{1,6}\s+(.+)$/gm.test(line)) {
          const level = line.match(/^#{1,6}/)![0].length;
          formattedValue += `<h${level}>${line.replace(/^#{1,6}\s+(.+)$/, '$1')}</h${level}>`;
        }
        
        // List items: * Item (must be at the start of the line)
        else if (/^\*\s+(.+)/.test(line)) {
          formattedValue += `<ul><li>${line.replace(/^\*\s+(.+)/, '$1')}</li></ul>`;
        }
        
        // Horizontal rule: ---
        else if (/^-{3,}$/.test(line)) {
          formattedValue += `<hr>`;
        }
        
        // Regular paragraph
        else {
          formattedValue += `<p style= "line-height: 1.5; font-size:15px">${line}</p>`;
        }
      }
    });

    // Return formatted text as SafeHtml for Angular
    return this.sanitizer.bypassSecurityTrustHtml(formattedValue);
  }
}

