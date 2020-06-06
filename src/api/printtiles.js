import axios from "axios";

// export default axios.create({
// 	baseURL: "http://localhost:3000",
// });

export default axios.create({
	baseURL: "http://ptapidev.azapis.com/api/version/1.0",
	headers: {
		"Authenticate-Key":
			"OhPX8tSdV8Q0J3rr2vVmpPi5G8UW5t5VS9bmwEC7Wg+i2gpxEHEAwjrWgV2zHlIkjM602BODZsp0qG+Fh37klw==",
	},
});
