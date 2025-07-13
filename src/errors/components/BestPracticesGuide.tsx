import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertTriangle, Code2, Users, Server, Shield } from 'lucide-react';

export default function BestPracticesGuide() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: BookOpen },
    { id: 'patterns', title: 'Error Patterns', icon: Code2 },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'performance', title: 'Performance', icon: Server },
    { id: 'user-experience', title: 'User Experience', icon: Users },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Error Handling Best Practices</h3>
        <p className="text-gray-300 text-lg">
          Proper error handling is crucial for building robust, maintainable, and user-friendly applications. 
          The syntaxLabz/errors package provides a structured approach to HTTP error handling in Go applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-400 mr-3" size={24} />
            <h4 className="text-lg font-semibold text-white">Do's</h4>
          </div>
          <ul className="space-y-2 text-green-300">
            <li>• Use consistent error response formats</li>
            <li>• Provide meaningful error messages</li>
            <li>• Include proper HTTP status codes</li>
            <li>• Log detailed errors server-side</li>
            <li>• Validate input early and thoroughly</li>
            <li>• Handle edge cases gracefully</li>
          </ul>
        </div>

        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <XCircle className="text-red-400 mr-3" size={24} />
            <h4 className="text-lg font-semibold text-white">Don'ts</h4>
          </div>
          <ul className="space-y-2 text-red-300">
            <li>• Don't expose sensitive information</li>
            <li>• Don't use generic error messages</li>
            <li>• Don't ignore error context</li>
            <li>• Don't return stack traces to clients</li>
            <li>• Don't use wrong HTTP status codes</li>
            <li>• Don't log sensitive data</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Error Response Structure</h4>
        <div className="bg-gray-900 rounded border border-gray-600 p-4">
          <pre className="text-blue-400 text-sm">
{`{
  "error": "error_type",           // Machine-readable error type
  "message": "Human readable message", // User-friendly description
  "status": 400,                   // HTTP status code
  "timestamp": "2025-01-27T10:30:00Z", // ISO 8601 timestamp
  "field": "email"                 // Optional: specific field (for validation errors)
}`}
          </pre>
        </div>
      </div>
    </div>
  );

  const renderPatterns = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Common Error Patterns</h3>
        <p className="text-gray-300">
          Understanding when and how to use different error types is key to building consistent APIs.
        </p>
      </div>

      <div className="space-y-6">
        {/* Validation Pattern */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="text-yellow-400 mr-3" size={20} />
            Validation Pattern
          </h4>
          <p className="text-gray-300 mb-4">
            Always validate input parameters early in your request handling pipeline.
          </p>
          
          <div className="bg-gray-900 rounded border border-gray-600 p-4 mb-4">
            <pre className="text-sm text-green-400">
{`// 1. Check for missing required fields
if req.Email == "" {
    return httperrors.MissingParameter("email")
}

// 2. Validate format/constraints
if !isValidEmail(req.Email) {
    return httperrors.InvalidParameter("email", "must be a valid email address")
}

// 3. Check business rules
if len(req.Password) < 8 {
    return httperrors.InvalidParameter("password", "must be at least 8 characters")
}`}
            </pre>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
            <h5 className="text-blue-300 font-medium mb-2">Key Points:</h5>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Validate in order: required → format → business rules</li>
              <li>• Return specific field names in error messages</li>
              <li>• Provide clear guidance on expected format</li>
            </ul>
          </div>
        </div>

        {/* Authentication Pattern */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Authentication Pattern</h4>
          <p className="text-gray-300 mb-4">
            Handle authentication and authorization errors consistently.
          </p>
          
          <div className="bg-gray-900 rounded border border-gray-600 p-4 mb-4">
            <pre className="text-sm text-green-400">
{`// 1. Check if authentication is provided
token := c.GetHeader("Authorization")
if token == "" {
    return httperrors.Unauthorized("authentication required")
}

// 2. Validate token
user, err := validateToken(token)
if err != nil {
    return httperrors.Unauthorized("invalid or expired token")
}

// 3. Check permissions
if !user.HasRole("admin") {
    return httperrors.Forbidden("admin access required")
}`}
            </pre>
          </div>

          <div className="bg-orange-900/20 border border-orange-700 rounded p-4">
            <h5 className="text-orange-300 font-medium mb-2">Security Note:</h5>
            <p className="text-orange-200 text-sm">
              Be careful not to leak information about whether users exist or tokens are valid. 
              Use generic messages when appropriate.
            </p>
          </div>
        </div>

        {/* Resource Pattern */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Resource Management Pattern</h4>
          <p className="text-gray-300 mb-4">
            Handle resource operations with proper error responses.
          </p>
          
          <div className="bg-gray-900 rounded border border-gray-600 p-4 mb-4">
            <pre className="text-sm text-green-400">
{`// 1. Check if resource exists
resource, err := getResourceByID(id)
if err != nil {
    return httperrors.NotFound("resource")
}

// 2. Check for conflicts (e.g., creating duplicate)
if resourceExists(name) {
    return httperrors.Conflict("resource with this name already exists")
}

// 3. Handle server errors gracefully
if err := saveResource(resource); err != nil {
    log.Error("Failed to save resource:", err)
    return httperrors.InternalServerError("failed to save resource")
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Security Considerations</h3>
        <p className="text-gray-300">
          Proper error handling is a critical component of application security.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="text-red-400 mr-3" size={20} />
            Information Disclosure Prevention
          </h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="text-red-300 font-medium mb-2">❌ Bad Example</h5>
              <div className="bg-gray-900 rounded border border-gray-600 p-4">
                <pre className="text-sm text-red-400">
{`// DON'T: Reveals database structure
return errors.New("User with email 'john@example.com' not found in table 'users'")

// DON'T: Reveals file system paths
return errors.New("Config file not found at /etc/app/config.json")

// DON'T: Reveals internal implementation
return errors.New("Redis connection failed: connection refused")`}
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-green-300 font-medium mb-2">✅ Good Example</h5>
              <div className="bg-gray-900 rounded border border-gray-600 p-4">
                <pre className="text-sm text-green-400">
{`// DO: Generic but helpful
return httperrors.NotFound("user")

// DO: Log details server-side, return generic error
log.Error("Config file not found:", err)
return httperrors.InternalServerError("configuration error")

// DO: Abstract internal failures
log.Error("Redis connection failed:", err)
return httperrors.InternalServerError("service temporarily unavailable")`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Rate Limiting & DDoS Protection</h4>
          <div className="bg-gray-900 rounded border border-gray-600 p-4">
            <pre className="text-sm text-green-400">
{`// Implement rate limiting for sensitive endpoints
if rateLimiter.Exceeded(clientIP) {
    return httperrors.RateLimited("too many requests")
}

// Different limits for different operations
if loginAttempts.Exceeded(email) {
    return httperrors.RateLimited("too many login attempts")
}

// Include retry-after header
w.Header().Set("Retry-After", "60")
return httperrors.RateLimited("rate limit exceeded")`}
            </pre>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Authentication Security</h4>
          <ul className="space-y-2 text-blue-200">
            <li>• Use consistent timing for authentication failures</li>
            <li>• Don't reveal whether usernames exist</li>
            <li>• Implement account lockout mechanisms</li>
            <li>• Log all authentication attempts</li>
            <li>• Use secure session management</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Performance Considerations</h3>
        <p className="text-gray-300">
          Efficient error handling improves both performance and user experience.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Early Validation</h4>
          <p className="text-gray-300 mb-4">
            Validate inputs as early as possible to avoid expensive operations.
          </p>
          
          <div className="bg-gray-900 rounded border border-gray-600 p-4">
            <pre className="text-sm text-green-400">
{`func createUser(req CreateUserRequest) error {
    // 1. Validate cheapest operations first
    if req.Email == "" {
        return httperrors.MissingParameter("email")
    }
    
    // 2. Format validation (CPU-bound)
    if !isValidEmail(req.Email) {
        return httperrors.InvalidParameter("email", "invalid format")
    }
    
    // 3. Database checks last (I/O-bound)
    if userExists(req.Email) {
        return httperrors.Conflict("email already exists")
    }
    
    // 4. Only now proceed with expensive operations
    return createUserInDatabase(req)
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Efficient Error Logging</h4>
          <div className="bg-gray-900 rounded border border-gray-600 p-4">
            <pre className="text-sm text-green-400">
{`// Use structured logging for better performance
log.WithFields(log.Fields{
    "user_id": userID,
    "endpoint": "/api/users",
    "error": err.Error(),
}).Error("User operation failed")

// Avoid string concatenation in hot paths
log.Errorf("User %d operation failed: %v", userID, err) // Better than
log.Error("User " + strconv.Itoa(userID) + " operation failed: " + err.Error())`}
            </pre>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Caching Strategies</h4>
          <ul className="space-y-2 text-green-200">
            <li>• Cache validation results for expensive operations</li>
            <li>• Use connection pooling for database operations</li>
            <li>• Implement circuit breakers for external services</li>
            <li>• Consider async processing for non-critical validations</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderUserExperience = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">User Experience Guidelines</h3>
        <p className="text-gray-300">
          Error messages should help users understand what went wrong and how to fix it.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Clear Error Messages</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="text-red-300 font-medium mb-2">❌ Poor Messages</h5>
              <div className="bg-red-900/20 border border-red-700 rounded p-4">
                <pre className="text-sm text-red-400">
{`"Invalid input"
"Error occurred"
"Bad request"
"Validation failed"`}
                </pre>
              </div>
            </div>

            <div>
              <h5 className="text-green-300 font-medium mb-2">✅ Good Messages</h5>
              <div className="bg-green-900/20 border border-green-700 rounded p-4">
                <pre className="text-sm text-green-400">
{`"Email address is required"
"Password must be at least 8 characters long"
"Email format is invalid. Please use format: user@example.com"
"Username 'john_doe' is already taken. Please choose another."`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Helpful Error Responses</h4>
          <div className="bg-gray-900 rounded border border-gray-600 p-4">
            <pre className="text-sm text-blue-400">
{`{
  "error": "invalid_parameter",
  "message": "Password must contain at least 8 characters, one uppercase letter, and one number",
  "field": "password",
  "requirements": {
    "min_length": 8,
    "uppercase": true,
    "number": true
  },
  "examples": ["MyPass123", "SecureP@ss1"]
}`}
            </pre>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Progressive Disclosure</h4>
          <ul className="space-y-2 text-blue-200">
            <li>• Show the most important error first</li>
            <li>• Provide detailed explanations when requested</li>
            <li>• Include links to documentation or help</li>
            <li>• Offer suggestions for correction</li>
            <li>• Use consistent error formatting across your API</li>
          </ul>
        </div>

        <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-4">Error Recovery</h4>
          <p className="text-purple-200 mb-4">
            Help users recover from errors by providing actionable guidance:
          </p>
          <div className="bg-gray-900 rounded border border-gray-600 p-4">
            <pre className="text-sm text-purple-400">
{`{
  "error": "conflict",
  "message": "Email address already registered",
  "field": "email",
  "suggestions": [
    "Try logging in instead",
    "Use the forgot password feature",
    "Contact support if you believe this is an error"
  ],
  "links": {
    "login": "/auth/login",
    "forgot_password": "/auth/forgot-password",
    "support": "/support"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'patterns': return renderPatterns();
      case 'security': return renderSecurity();
      case 'performance': return renderPerformance();
      case 'user-experience': return renderUserExperience();
      default: return renderOverview();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Best Practices Guide</h2>
        <p className="text-gray-400 text-lg">
          Learn how to implement effective error handling patterns with syntaxLabz/errors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sticky top-24">
            <h3 className="text-lg font-medium text-white mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}