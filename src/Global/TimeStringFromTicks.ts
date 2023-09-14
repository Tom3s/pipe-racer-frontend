// static func getTimeStringFromTicks(ticks: int) -> String:
// 	if ticks == -1:
// 		return "N/A"
// 	var seconds: int = ticks / 1000
// 	var minutes: int = seconds / 60

// 	return "%02d:%02d:" % [minutes % 60, seconds % 60] + ("%.3f" % ((ticks % 1000) / float(1000))).split(".")[1]

export const timeStringFromTicks = (ticks: number): string => {
	if (ticks === -1) {
	  return "N/A";
	}
	
	const seconds: number = Math.floor(ticks / 1000);
	const minutes: number = Math.floor(seconds / 60);
  
	const paddedMinutes = String(minutes % 60).padStart(2, '0'); // Pad minutes with leading zeros
	const paddedSeconds = String(seconds % 60).padStart(2, '0'); // Pad seconds with leading zeros
  
	return `${paddedMinutes}:${paddedSeconds}:${((ticks % 1000) / 1000).toFixed(3).split(".")[1]}`;
  };
