function matchUsers(currentUser, allUsers, maxDistance = 10) {
  const matches = [];

  console.log(currentUser)
  allUsers.forEach((user) => {
    // Step 1: Check if there are any shared activities
    const sharedActivities = currentUser.activities.filter(activity =>
      user.activities.includes(activity)
    );

    if (sharedActivities.length > 0) {
      // Step 2: Calculate the distance between the users
      const distance = calculateDistance(
        currentUser.location.lat, currentUser.location.lng,
        user.location.lat, user.location.lng
      );

      // Step 3: Check if the user is within the max distance
      if (distance <= maxDistance) {
        // Add user to matches with distance and shared activities
        matches.push({
          userId: user.userId,
          distance: distance.toFixed(2), // Format distance to 2 decimal places
          sharedActivities: sharedActivities
        });
      }
    }
  });

  // Step 4: Sort matches by distance (optional)
  matches.sort((a, b) => a.distance - b.distance);

  return matches;
}
module.exports =matchUsers



function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const distance = R * c; // Distance in kilometers
  return distance;
}
