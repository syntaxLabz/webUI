export interface ErrorType {
  name: string;
  category: 'validation' | 'authentication' | 'resource' | 'server';
  httpStatus: number;
  description: string;
  usage: string;
  examples: string[];
  codeSnippet: string;
  jsonResponse: any;
  bestPractices: string[];
  commonScenarios: string[];
  keywords: string[];
  frameworks: {
    vanilla: string;
    gin: string;
    echo: string;
    fiber: string;
  };
}

export const errorsDatabase: Record<string, ErrorType> = {
  "MissingParameter": {
    name: "MissingParameter",
    category: "validation",
    httpStatus: 400,
    description: "Missing required parameter",
    usage: "When a required parameter is not provided in the request",
    examples: ["email", "password", "userId", "name"],
    codeSnippet: `httperrors.MissingParameter("email")`,
    jsonResponse: {
      error: "missing_parameter",
      message: "Missing required parameter: email",
      status: 400,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Always validate required parameters early in request processing",
      "Provide clear parameter names in error messages",
      "Use consistent error format across your API"
    ],
    commonScenarios: [
      "User registration without email",
      "API request missing required fields",
      "Form submission with empty required inputs"
    ],
    keywords: ["missing", "required", "parameter", "field", "empty", "null"],
    frameworks: {
      vanilla: `if r.FormValue("email") == "" {
    return httperrors.MissingParameter("email")
}`,
      gin: `email := c.PostForm("email")
if email == "" {
    c.JSON(400, httperrors.MissingParameter("email"))
    return
}`,
      echo: `email := c.FormValue("email")
if email == "" {
    return c.JSON(400, httperrors.MissingParameter("email"))
}`,
      fiber: `email := c.FormValue("email")
if email == "" {
    return c.Status(400).JSON(httperrors.MissingParameter("email"))
}`
    }
  },
  "InvalidParameter": {
    name: "InvalidParameter",
    category: "validation",
    httpStatus: 400,
    description: "Invalid parameter value",
    usage: "When a parameter value doesn't meet validation requirements",
    examples: ["email format", "age range", "enum value"],
    codeSnippet: `httperrors.InvalidParameter("email", "invalid email format")`,
    jsonResponse: {
      error: "invalid_parameter",
      message: "Invalid parameter: email - invalid email format",
      status: 400,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Provide specific validation error messages",
      "Include expected format or range in error details",
      "Validate input on both client and server side"
    ],
    commonScenarios: [
      "Invalid email format",
      "Age outside allowed range",
      "Enum value not in allowed list"
    ],
    keywords: ["invalid", "format", "validation", "wrong", "incorrect"],
    frameworks: {
      vanilla: `if !isValidEmail(email) {
    return httperrors.InvalidParameter("email", "invalid email format")
}`,
      gin: `if !isValidEmail(email) {
    c.JSON(400, httperrors.InvalidParameter("email", "invalid email format"))
    return
}`,
      echo: `if !isValidEmail(email) {
    return c.JSON(400, httperrors.InvalidParameter("email", "invalid email format"))
}`,
      fiber: `if !isValidEmail(email) {
    return c.Status(400).JSON(httperrors.InvalidParameter("email", "invalid email format"))
}`
    }
  },
  "Unauthorized": {
    name: "Unauthorized",
    category: "authentication",
    httpStatus: 401,
    description: "Authentication required",
    usage: "When user needs to authenticate to access the resource",
    examples: ["missing token", "expired session", "invalid credentials"],
    codeSnippet: `httperrors.Unauthorized("authentication required")`,
    jsonResponse: {
      error: "unauthorized",
      message: "Authentication required",
      status: 401,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Don't reveal sensitive information in error messages",
      "Use consistent authentication mechanisms",
      "Implement proper token refresh flows"
    ],
    commonScenarios: [
      "Accessing protected endpoints without token",
      "Expired JWT tokens",
      "Invalid API keys"
    ],
    keywords: ["unauthorized", "authentication", "token", "login", "credentials"],
    frameworks: {
      vanilla: `token := r.Header.Get("Authorization")
if token == "" {
    return httperrors.Unauthorized("authentication required")
}`,
      gin: `token := c.GetHeader("Authorization")
if token == "" {
    c.JSON(401, httperrors.Unauthorized("authentication required"))
    return
}`,
      echo: `token := c.Request().Header.Get("Authorization")
if token == "" {
    return c.JSON(401, httperrors.Unauthorized("authentication required"))
}`,
      fiber: `token := c.Get("Authorization")
if token == "" {
    return c.Status(401).JSON(httperrors.Unauthorized("authentication required"))
}`
    }
  },
  "Forbidden": {
    name: "Forbidden",
    category: "authentication",
    httpStatus: 403,
    description: "Access forbidden",
    usage: "When user is authenticated but doesn't have permission",
    examples: ["insufficient permissions", "role restrictions", "resource ownership"],
    codeSnippet: `httperrors.Forbidden("insufficient permissions")`,
    jsonResponse: {
      error: "forbidden",
      message: "Access forbidden: insufficient permissions",
      status: 403,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Implement role-based access control",
      "Check permissions early in request flow",
      "Use consistent permission models"
    ],
    commonScenarios: [
      "Admin-only endpoints accessed by regular users",
      "Accessing other users' private data",
      "Insufficient role permissions"
    ],
    keywords: ["forbidden", "permission", "access", "role", "insufficient"],
    frameworks: {
      vanilla: `if !hasPermission(user, "admin") {
    return httperrors.Forbidden("insufficient permissions")
}`,
      gin: `if !hasPermission(user, "admin") {
    c.JSON(403, httperrors.Forbidden("insufficient permissions"))
    return
}`,
      echo: `if !hasPermission(user, "admin") {
    return c.JSON(403, httperrors.Forbidden("insufficient permissions"))
}`,
      fiber: `if !hasPermission(user, "admin") {
    return c.Status(403).JSON(httperrors.Forbidden("insufficient permissions"))
}`
    }
  },
  "NotFound": {
    name: "NotFound",
    category: "resource",
    httpStatus: 404,
    description: "Resource not found",
    usage: "When requested resource doesn't exist",
    examples: ["user ID", "product", "endpoint"],
    codeSnippet: `httperrors.NotFound("user")`,
    jsonResponse: {
      error: "not_found",
      message: "Resource not found: user",
      status: 404,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Be consistent with 404 responses",
      "Don't reveal sensitive information about resource existence",
      "Provide helpful error messages"
    ],
    commonScenarios: [
      "User ID doesn't exist in database",
      "Product not found by ID",
      "Invalid API endpoints"
    ],
    keywords: ["not found", "missing", "doesn't exist", "invalid id"],
    frameworks: {
      vanilla: `user, err := getUserByID(id)
if err != nil {
    return httperrors.NotFound("user")
}`,
      gin: `user, err := getUserByID(id)
if err != nil {
    c.JSON(404, httperrors.NotFound("user"))
    return
}`,
      echo: `user, err := getUserByID(id)
if err != nil {
    return c.JSON(404, httperrors.NotFound("user"))
}`,
      fiber: `user, err := getUserByID(id)
if err != nil {
    return c.Status(404).JSON(httperrors.NotFound("user"))
}`
    }
  },
  "Conflict": {
    name: "Conflict",
    category: "resource",
    httpStatus: 409,
    description: "Resource conflict",
    usage: "When resource already exists or conflicts with current state",
    examples: ["duplicate email", "username taken", "concurrent updates"],
    codeSnippet: `httperrors.Conflict("email already exists")`,
    jsonResponse: {
      error: "conflict",
      message: "Resource conflict: email already exists",
      status: 409,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Check for conflicts before creating resources",
      "Use database constraints to enforce uniqueness",
      "Implement optimistic locking for concurrent updates"
    ],
    commonScenarios: [
      "User registration with existing email",
      "Creating duplicate resources",
      "Concurrent modification conflicts"
    ],
    keywords: ["conflict", "already exists", "duplicate", "taken", "concurrent"],
    frameworks: {
      vanilla: `if userExists(email) {
    return httperrors.Conflict("email already exists")
}`,
      gin: `if userExists(email) {
    c.JSON(409, httperrors.Conflict("email already exists"))
    return
}`,
      echo: `if userExists(email) {
    return c.JSON(409, httperrors.Conflict("email already exists"))
}`,
      fiber: `if userExists(email) {
    return c.Status(409).JSON(httperrors.Conflict("email already exists"))
}`
    }
  },
  "RateLimited": {
    name: "RateLimited",
    category: "server",
    httpStatus: 429,
    description: "Rate limit exceeded",
    usage: "When user has exceeded API rate limits",
    examples: ["API calls per minute", "requests per hour", "bandwidth limits"],
    codeSnippet: `httperrors.RateLimited("too many requests")`,
    jsonResponse: {
      error: "rate_limited",
      message: "Rate limit exceeded: too many requests",
      status: 429,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Implement sliding window rate limiting",
      "Provide rate limit headers in responses",
      "Use different limits for different endpoints"
    ],
    commonScenarios: [
      "Too many API requests per minute",
      "Bulk operations exceeding limits",
      "DDoS protection triggers"
    ],
    keywords: ["rate limit", "too many", "exceeded", "throttle", "quota"],
    frameworks: {
      vanilla: `if rateLimiter.Exceeded(userID) {
    return httperrors.RateLimited("too many requests")
}`,
      gin: `if rateLimiter.Exceeded(userID) {
    c.JSON(429, httperrors.RateLimited("too many requests"))
    return
}`,
      echo: `if rateLimiter.Exceeded(userID) {
    return c.JSON(429, httperrors.RateLimited("too many requests"))
}`,
      fiber: `if rateLimiter.Exceeded(userID) {
    return c.Status(429).JSON(httperrors.RateLimited("too many requests"))
}`
    }
  },
  "InternalServerError": {
    name: "InternalServerError",
    category: "server",
    httpStatus: 500,
    description: "Internal server error",
    usage: "When an unexpected server error occurs",
    examples: ["database connection", "third-party service", "unexpected exceptions"],
    codeSnippet: `httperrors.InternalServerError("database connection failed")`,
    jsonResponse: {
      error: "internal_server_error",
      message: "Internal server error: database connection failed",
      status: 500,
      timestamp: "2025-01-27T10:30:00Z"
    },
    bestPractices: [
      "Log detailed error information server-side",
      "Don't expose sensitive error details to clients",
      "Implement proper error monitoring and alerting"
    ],
    commonScenarios: [
      "Database connection failures",
      "Third-party service unavailable",
      "Unexpected application errors"
    ],
    keywords: ["server error", "internal", "database", "connection", "failed"],
    frameworks: {
      vanilla: `_, err := db.Query("SELECT * FROM users")
if err != nil {
    log.Error("Database error:", err)
    return httperrors.InternalServerError("database connection failed")
}`,
      gin: `_, err := db.Query("SELECT * FROM users")
if err != nil {
    log.Error("Database error:", err)
    c.JSON(500, httperrors.InternalServerError("database connection failed"))
    return
}`,
      echo: `_, err := db.Query("SELECT * FROM users")
if err != nil {
    log.Error("Database error:", err)
    return c.JSON(500, httperrors.InternalServerError("database connection failed"))
}`,
      fiber: `_, err := db.Query("SELECT * FROM users")
if err != nil {
    log.Error("Database error:", err)
    return c.Status(500).JSON(httperrors.InternalServerError("database connection failed"))
}`
    }
  }
};

export const predefinedScenarios = [
  {
    title: "User Registration",
    description: "User tries to register with missing email",
    input: "User is trying to register but didn't provide an email address",
    expectedErrors: ["MissingParameter"]
  },
  {
    title: "Invalid Email Format",
    description: "User provides malformed email address",
    input: "User entered 'invalid-email' as their email address during registration",
    expectedErrors: ["InvalidParameter"]
  },
  {
    title: "Protected Resource Access",
    description: "Accessing API without authentication",
    input: "User is trying to access their profile without providing an authentication token",
    expectedErrors: ["Unauthorized"]
  },
  {
    title: "Insufficient Permissions",
    description: "User lacks required permissions",
    input: "Regular user is trying to access admin-only dashboard",
    expectedErrors: ["Forbidden"]
  },
  {
    title: "User Not Found",
    description: "Requesting non-existent user",
    input: "API request for user ID 999 but user doesn't exist in database",
    expectedErrors: ["NotFound"]
  },
  {
    title: "Duplicate Registration",
    description: "Email already registered",
    input: "User trying to register with email that already exists in the system",
    expectedErrors: ["Conflict"]
  },
  {
    title: "API Rate Limiting",
    description: "Too many requests from user",
    input: "User has made 1000 API calls in the last minute, exceeding the limit",
    expectedErrors: ["RateLimited"]
  },
  {
    title: "Database Connection Issue",
    description: "Server database connectivity problems",
    input: "Unable to connect to database server during user login",
    expectedErrors: ["InternalServerError"]
  }
];