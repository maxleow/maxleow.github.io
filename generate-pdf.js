const { chromium } = require('playwright');

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  // Launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to your local Jekyll site
    console.log('📄 Loading resume site...');
    await page.goto('http://localhost:4000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait a bit more for any remaining content to load
    await page.waitForTimeout(2000);
    
    // Generate PDF with professional settings
    console.log('🎯 Generating PDF...');
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `max-leow-resume-${timestamp}.pdf`;
    
    await page.pdf({
      path: filename,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });
    
    console.log(`✅ PDF generated successfully: ${filename}`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    
    if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      console.log('💡 Make sure your Jekyll server is running at http://localhost:4000');
      console.log('   Run: bundle exec jekyll serve --host=0.0.0.0 --port=4000');
    }
  } finally {
    await browser.close();
  }
}

// Run the function
generatePDF(); 