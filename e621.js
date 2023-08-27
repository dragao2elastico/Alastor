// const baseUrl = "https://e621.net/posts.json";

// const headers = new Headers({
//   "Authorization": "Basic " + btoa(`${username}:${apiKey}`),
//   "User-Agent": `Alastor/1.0 (by ${username} on e621)` || username
// });

// fetch(baseUrl, { method: 'GET', headers })
//   .then(response => response.json())
//   .then(data => {
//     if (data.posts && data.posts.length > 0) {
//       data.posts.forEach(post => {
//         // console.log(`Title: ${post.tags}`);
        
//         if (post.tags.artist || post.tags.artists) {
//           console.log(`Author: ${post.tags.artist || post.tags.artists.join(", ")}`);
//         } else {
//           console.log("Author: N/A");
//         }
        
//         if (post.tags.general) {
//           console.log(`Tags: ${post.tags.general.join(", ")}`);
//         } else {
//           console.log("Tags: N/A");
//         }
        
//         console.log("-----");
//       });
//     } else {
//       console.log("No posts found.");
//     }
//   })
//   .catch(error => console.error("Error:", error));

const username = "dragao-elastico";
const apiKey = "dVLUoV1SKi6uf55bBebCtdwA";

const tagsToSearch = ["tomboy"]//, "feline", "anthro"];

const tagSearchUrl = `https://e621.net/tags.json?search[name_matches]=${tagsToSearch.join(",")}`;
const headers = new Headers({
  "Authorization": "Basic " + btoa(`${username}:${apiKey}`),
  "User-Agent": `Alastor/1.0 (by ${username} on e621)` || username
});

fetch(tagSearchUrl, { method: 'GET', headers })
  .then(response => response.json())
  .then(data => {
    if (data.tags) { // && data.tags.length > 0
      const tagNames = data.tags.map(tag => tag.name);

      const tagQueryString = tagNames.map(tag => encodeURIComponent(tag)).join('+');

      const postSearchUrl = `https://e621.net/posts.json?tags=${tagQueryString}`;

      fetch(postSearchUrl, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
          if (data.posts && data.posts.length > 0) {
            data.posts.forEach(post => {
              console.log(`Title: ${post.title}`);
              console.log(`Author: ${post.tags.artist || post.tags.artists.join(", ") || "N/A"}`);
              console.log(`Tags: ${post.tags.general ? post.tags.general.join(", ") : "N/A"}`);
              console.log("-----");
            });
          } else {
            console.log("No posts found.");
          }
        })
        .catch(error => console.error("Error fetching posts:", error));
    } else {
      console.log("No matching tags found.");
    }
  })
  .catch(error => console.error("Error fetching tags:", error));


