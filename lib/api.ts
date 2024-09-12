const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ApiCallOptions {
	cache?: RequestCache; // Use standard fetch cache option
	revalidate?: number; // Optional revalidation time in seconds
}

async function apiCall(endpoint: string, method: string, body?: any, token?: string, options?: ApiCallOptions) {
	try {
		const headers: HeadersInit = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};

		// Add Authorization header if token is provided
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		// Define fetch options
		const fetchOptions: RequestInit = {
			method,
			headers,
		};

		// Only add body if the method is not GET or HEAD
		if (method !== "GET" && method !== "HEAD" && body) {
			fetchOptions.body = JSON.stringify(body);
		}

		// Apply caching and revalidation strategies for GET requests
		if (method === "GET") {
			if (options?.cache) {
				fetchOptions.cache = options.cache;
			}
			if (options?.revalidate !== undefined) {
				fetchOptions.next = { revalidate: options.revalidate };
			}
		}

		const response = await fetch(`${apiUrl}${endpoint}`, fetchOptions);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data?.message || "Request failed");
		}

		return data;
	} catch (error: any) {
		console.error(`Error in ${method} ${endpoint}:`, error.message);
		throw new Error(error.message || "Something went wrong");
	}
}

//AUTH Functions
export async function signupCall(signupDetails: any) {
	return apiCall("/auth/signup", "POST", signupDetails);
}

export async function resendOtp(identifier: any) {
	return apiCall(`/auth/token/${identifier}`, "PATCH");
}

export async function validateOtp(otpDetails: any) {
	return apiCall("/auth/otp/verify", "POST", otpDetails);
}

export async function updatePassword(updatePasswordDetails: any) {
	return apiCall("/auth/update-password", "POST", updatePasswordDetails);
}

export async function signinCall(signinDetails: any) {
	return apiCall("/auth/signin", "POST", signinDetails);
}

//Profile Functions

export async function getUserProfile(token?: string, options?: ApiCallOptions) {
	return apiCall("/user/profile", "GET", undefined, token, options);
}

//Product Functions
export async function getAllProductCatalog(options?: ApiCallOptions) {
	return apiCall("/product-catalog", "GET", options);
}
