// test-strapi-api.js (Run this in your blog-frontend directory)
async function testStrapiAPI() {
  try {
    console.log('Testing Strapi API...');
    
    // Test 1: Check if Strapi is running
    const response = await fetch('http://localhost:1337/api/posts?populate=*');
    
    if (!response.ok) {
      console.error('❌ Strapi API not responding:', response.status, response.statusText);
      return;
    }
    
    const data = await response.json();
    
    // Test 2: Check response structure
    console.log('✅ Strapi API is responding');
    console.log('Response structure:', {
      hasData: !!data.data,
      dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
      itemCount: Array.isArray(data.data) ? data.data.length : 'N/A'
    });
    
    // Test 3: Check first post structure
    if (Array.isArray(data.data) && data.data.length > 0) {
      const firstPost = data.data[0];
      console.log('First post structure:', {
        hasId: !!firstPost.id,
        hasAttributes: !!firstPost.attributes,
        attributes: firstPost.attributes ? Object.keys(firstPost.attributes) : 'none'
      });
      
      if (firstPost.attributes) {
        console.log('Content type:', typeof firstPost.attributes.content);
        if (Array.isArray(firstPost.attributes.content)) {
          console.log('Content is array with', firstPost.attributes.content.length, 'items');
          console.log('First content item:', firstPost.attributes.content[0]);
        }
      }
    }
    
    console.log('Full response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing Strapi API:', error);
  }
}

testStrapiAPI();