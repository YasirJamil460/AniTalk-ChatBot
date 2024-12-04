import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: string): any{
    if (!value) return '';

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
          // Close code block and format, add language at the start
          formattedValue += `<pre><code class="language-${codeLanguage}">` +
            (codeLanguage ? `${codeLanguage}\n` : '') + // Add language at the start
            `${codeBlockContent}</code></pre>`;
          codeBlockContent = '';
          insideCodeBlock = false;
        } else {
          // Start code block, extract language if present
          const match = line.match(/^```(\w*)/);
          if (match && match[1]) {
            codeLanguage = match[1]; // Extract language (e.g., python, javascript)
          }
          insideCodeBlock = true;
        }
      } else if (insideCodeBlock) {
        // Accumulate lines inside code block
        codeBlockContent += line + '\n';
      } else {
        // Handle regular content

        // Bold text: **bold**
        line = line.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        
        // Inline code: `code`
        line = line.replace(/`([^`]+)`/g, '<code>$1</code>');

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
          formattedValue += `<p>${line}</p>`;
        }
      }
    });

    // Return formatted text as SafeHtml for Angular
    return formattedValue;
  }
}
