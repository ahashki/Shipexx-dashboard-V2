"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, animate } from "framer-motion"
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AlertCircle,
  ArrowRight,
  Loader2,
  Globe,
  Shield,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Add this import at the top of the file

// Replace the hardcoded countries array with this:
const CountrySelector = ({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
}) => {
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
        const data = await response.json()

        const formattedCountries = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)
      } catch (error) {
        console.error("Error fetching countries:", error)
        // Fallback to a few common countries if API fails
        setCountries([
          { name: "United States", code: "US" },
          { name: "United Kingdom", code: "GB" },
          { name: "Canada", code: "CA" },
          { name: "Australia", code: "AU" },
          { name: "Germany", code: "DE" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return (
    <div className="space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="country" className={error ? "border-destructive" : ""}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading countries...
            </SelectItem>
          ) : (
            countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  )
}

// Add country codes to the countries array
const countriesWithCodes = [
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "uk", name: "United Kingdom" },
  { code: "au", name: "Australia" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "jp", name: "Japan" },
  { code: "cn", name: "China" },
  { code: "in", name: "India" },
  { code: "br", name: "Brazil" },
  { code: "mx", name: "Mexico" },
  { code: "es", name: "Spain" },
  { code: "it", name: "Italy" },
  { code: "nl", name: "Netherlands" },
  { code: "sg", name: "Singapore" },
]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((country) => {
    const codes = {
      us: { code: "+1", flag: "🇺🇸" },
      ca: { code: "+1", flag: "🇨🇦" },
      uk: { code: "+44", flag: "🇬🇧" },
      au: { code: "+61", flag: "🇦🇺" },
      de: { code: "+49", flag: "🇩🇪" },
      fr: { code: "+33", flag: "🇫🇷" },
      jp: { code: "+81", flag: "🇯🇵" },
      cn: { code: "+86", flag: "🇨🇳" },
      in: { code: "+91", flag: "🇮🇳" },
      br: { code: "+55", flag: "🇧🇷" },
      mx: { code: "+52", flag: "🇲🇽" },
      es: { code: "+34", flag: "🇪🇸" },
      it: { code: "+39", flag: "🇮🇹" },
      nl: { code: "+31", flag: "🇳🇱" },
      sg: { code: "+65", flag: "🇸🇬" },
    }

    return {
      ...country,
      phoneCode: codes[country.code]?.code || "+1",
      flag: codes[country.code]?.flag || "🌍",
    }
  })

// Flying Box component
const FlyingBox = ({ direction, delay, duration, size, yPosition, opacity, rotation }) => {
  const x = useState(direction === "right" ? -100 : window.innerWidth + 100)[0]
  const rotate = useState(rotation)[0]

  useEffect(() => {
    const controls = animate(x, direction === "right" ? window.innerWidth + 100 : -100, {
      duration: duration,
      delay: delay,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 2 + 1,
    })

    const rotateControls = animate(rotate, rotation + (Math.random() > 0.5 ? 360 : -360), {
      duration: duration * 2,
      delay: delay,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
    })

    return () => {
      controls.stop()
      rotateControls.stop()
    }
  }, [direction, delay, duration, x, rotate, rotation])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x,
        y: yPosition,
        rotate,
        opacity,
        zIndex: 10,
      }}
    >
      <div
        className="border-2 border-primary/30 bg-primary/5 dark:bg-primary/10 rounded-md"
        style={{
          width: size,
          height: size,
        }}
      />
    </motion.div>
  )
}

// Flying Boxes container component
const FlyingBoxes = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const boxesCount = 12
  const boxes = []

  for (let i = 0; i < boxesCount; i++) {
    const direction = i % 2 === 0 ? "right" : "left"
    const delay = Math.random() * 5
    const duration = Math.random() * 15 + 10
    const size = Math.random() * 60 + 20
    const yPosition = Math.random() * dimensions.height
    const opacity = Math.random() * 0.3 + 0.1
    const rotation = Math.random() * 180 - 90

    boxes.push(
      <FlyingBox
        key={i}
        direction={direction}
        delay={delay}
        duration={duration}
        size={size}
        yPosition={yPosition}
        opacity={opacity}
        rotation={rotation}
      />,
    )
  }

  return <>{boxes}</>
}

// Password strength criteria
const passwordCriteria = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "At least one uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "At least one lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "At least one number", regex: /[0-9]/ },
  { id: "special", label: "At least one special character", regex: /[^A-Za-z0-9]/ },
]

export default function PremiumRegisterPage() {
  const router = useRouter()
  const [formStep, setFormStep] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registrationType, setRegistrationType] = useState("email")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    receiveUpdates: true,
  })

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  })

  // Check which password criteria are met
  const [criteriaStatus, setCriteriaStatus] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Update password strength and criteria status when password changes
  useEffect(() => {
    const newCriteriaStatus = {
      length: passwordCriteria[0].regex.test(formData.password),
      uppercase: passwordCriteria[1].regex.test(formData.password),
      lowercase: passwordCriteria[2].regex.test(formData.password),
      number: passwordCriteria[3].regex.test(formData.password),
      special: passwordCriteria[4].regex.test(formData.password),
    }

    setCriteriaStatus(newCriteriaStatus)

    // Calculate password strength (0-5)
    const metCriteria = Object.values(newCriteriaStatus).filter(Boolean).length
    setPasswordStrength(metCriteria)
  }, [formData.password])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Handle select changes (country)
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate form fields
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Phone validation
    if (formData.phone && !/^[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid"
      isValid = false
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (passwordStrength < 3) {
      newErrors.password = "Password is too weak"
      isValid = false
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Get the full phone number with country code
      const selectedCountry = countriesWithCodes.find((c) => c.code === formData.country)
      const fullPhoneNumber = formData.phone ? `${selectedCountry?.phoneCode || "+1"}${formData.phone}` : ""

      // Create submission data with full phone number
      const submissionData = {
        ...formData,
        fullPhone: fullPhoneNumber,
      }

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        console.log("Form submitted with data:", submissionData)
        // Redirect to dashboard or confirmation page
        router.push("/demo/top-menu3/dashboard")
      }, 1500)
    }
  }

  // Handle next step in form
  const handleNextStep = () => {
    const fieldsToValidate =
      formStep === 0
        ? ["firstName", "lastName", "email", "phone", "country"]
        : ["password", "confirmPassword", "agreeTerms"]

    let isStepValid = true
    const newErrors = { ...errors }

    // Validate only fields in current step
    fieldsToValidate.forEach((field) => {
      if (field === "firstName" && !formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
        isStepValid = false
      }

      if (field === "lastName" && !formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
        isStepValid = false
      }

      if (field === "email") {
        if (!formData.email.trim()) {
          newErrors.email = "Email is required"
          isStepValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid"
          isStepValid = false
        }
      }

      if (field === "phone" && formData.phone && !/^[0-9\s\-()]{7,15}$/.test(formData.phone)) {
        newErrors.phone = "Phone number is invalid"
        isStepValid = false
      }

      if (field === "country" && !formData.country) {
        newErrors.country = "Please select a country"
        isStepValid = false
      }

      if (field === "password") {
        if (!formData.password) {
          newErrors.password = "Password is required"
          isStepValid = false
        } else if (passwordStrength < 3) {
          newErrors.password = "Password is too weak"
          isStepValid = false
        }
      }

      if (field === "confirmPassword" && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
        isStepValid = false
      }

      if (field === "agreeTerms" && !formData.agreeTerms) {
        newErrors.agreeTerms = "You must agree to the terms and conditions"
        isStepValid = false
      }
    })

    setErrors(newErrors)

    if (isStepValid) {
      setFormStep(formStep + 1)
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300 overflow-hidden relative",
        isDarkMode && "dark from-gray-900 to-slate-800",
      )}
    >
      {/* Add the FlyingBoxes component here, but only after mounting */}
      {isMounted && <FlyingBoxes />}

      <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
        <span className="text-sm text-muted-foreground">{isDarkMode ? "Dark" : "Light"} Mode</span>
        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
      </div>

      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-xl border-0 overflow-hidden relative z-10">
            <div className="grid md:grid-cols-5">
              {/* Left sidebar with benefits */}
              <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-primary/90 to-primary/70 text-white p-8">
                <div className="h-full flex flex-col">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">Shipexx</h2>
                    <p className="text-primary-foreground/80">Your global shipping solution</p>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-4">Why join us?</h3>

                    <div className="flex items-start space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Global Reach</h4>
                        <p className="text-sm text-primary-foreground/80">Ship to over 200 countries worldwide</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure Shipping</h4>
                        <p className="text-sm text-primary-foreground/80">End-to-end tracking and insurance options</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Trusted by Millions</h4>
                        <p className="text-sm text-primary-foreground/80">Join our community of satisfied customers</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-medium">
                          JD
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-medium">
                          KL
                        </div>
                        <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-medium">
                          TS
                        </div>
                      </div>
                      <p className="text-sm">Joined by 10k+ users this month</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side with form */}
              <div className="col-span-5 md:col-span-3 p-6 md:p-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
                  <p className="text-muted-foreground mt-1">Start shipping globally in minutes</p>
                </div>

                <div className="mb-6">
                  <div className="relative flex items-center justify-between">
                    <div className="w-full absolute h-1 bg-gray-200 dark:bg-gray-700"></div>
                    <div
                      className={cn(
                        "absolute h-1 bg-primary transition-all duration-300",
                        formStep === 0 ? "w-1/2" : "w-full",
                      )}
                    ></div>

                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                      <User className="h-5 w-5" />
                    </div>

                    <div
                      className={cn(
                        "relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
                        formStep === 0
                          ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      <Lock className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 text-sm">
                    <div className="font-medium text-primary">Personal Details</div>
                    <div
                      className={cn(
                        "font-medium transition-colors duration-300",
                        formStep === 0 ? "text-muted-foreground" : "text-primary",
                      )}
                    >
                      Security
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {formStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">
                              First name
                              <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={cn(
                                  "pl-9",
                                  errors.firstName && "border-destructive focus-visible:ring-destructive",
                                )}
                                placeholder="John"
                                autoComplete="given-name"
                              />
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              {errors.firstName && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertCircle className="h-4 w-4 text-destructive" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{errors.firstName}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                            {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName">
                              Last name
                              <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={cn(
                                  "pl-9",
                                  errors.lastName && "border-destructive focus-visible:ring-destructive",
                                )}
                                placeholder="Doe"
                                autoComplete="family-name"
                              />
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              {errors.lastName && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertCircle className="h-4 w-4 text-destructive" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{errors.lastName}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                            {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email address
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={cn(
                                "pl-9",
                                errors.email && "border-destructive focus-visible:ring-destructive",
                              )}
                              placeholder="john.doe@example.com"
                              autoComplete="email"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            {errors.email && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertCircle className="h-4 w-4 text-destructive" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{errors.email}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                <span className="mr-1">
                                  {countriesWithCodes.find((c) => c.code === formData.country)?.flag || "🌍"}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {countriesWithCodes.find((c) => c.code === formData.country)?.phoneCode || "+1"}
                                </span>
                              </div>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={cn(
                                  "pl-16",
                                  errors.phone && "border-destructive focus-visible:ring-destructive",
                                )}
                                placeholder="(555) 123-4567"
                                autoComplete="tel-national"
                              />
                              {errors.phone && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <AlertCircle className="h-4 w-4 text-destructive" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{errors.phone}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                          </div>

                          <CountrySelector
                            value={formData.country}
                            onChange={(value) => handleInputChange("country", value)}
                            error={errors.country}
                          />
                        </div>

                        <div className="pt-4">
                          <Button type="button" onClick={handleNextStep} className="w-full">
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                          Already have an account?{" "}
                          <a href="/demo/top-menu3" className="text-primary font-medium hover:underline">
                            Sign in
                          </a>
                        </div>
                      </motion.div>
                    )}

                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="password">
                              Password
                              <span className="text-destructive ml-1">*</span>
                            </Label>
                            <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full transition-all duration-300",
                                  passwordStrength === 0 && "w-0",
                                  passwordStrength === 1 && "w-1/5 bg-red-500",
                                  passwordStrength === 2 && "w-2/5 bg-orange-500",
                                  passwordStrength === 3 && "w-3/5 bg-yellow-500",
                                  passwordStrength === 4 && "w-4/5 bg-lime-500",
                                  passwordStrength === 5 && "w-full bg-green-500",
                                )}
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleChange}
                              className={cn(
                                "pl-9 pr-10",
                                errors.password && "border-destructive focus-visible:ring-destructive",
                              )}
                              placeholder="••••••••"
                              autoComplete="new-password"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}

                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {passwordCriteria.map((criteria) => (
                              <div key={criteria.id} className="flex items-center text-xs">
                                <div
                                  className={cn(
                                    "mr-1.5 h-3.5 w-3.5 rounded-full flex items-center justify-center",
                                    criteriaStatus[criteria.id]
                                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                      : "bg-gray-100 text-gray-400 dark:bg-gray-800",
                                  )}
                                >
                                  {criteriaStatus[criteria.id] && <Check className="h-2.5 w-2.5" />}
                                </div>
                                <span
                                  className={cn(
                                    criteriaStatus[criteria.id]
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {criteria.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm password
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className={cn(
                                "pl-9",
                                errors.confirmPassword && "border-destructive focus-visible:ring-destructive",
                              )}
                              placeholder="••••••••"
                              autoComplete="new-password"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            {errors.confirmPassword && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertCircle className="h-4 w-4 text-destructive" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{errors.confirmPassword}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="agreeTerms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onCheckedChange={(checked) =>
                                handleChange({
                                  target: { name: "agreeTerms", type: "checkbox", checked },
                                })
                              }
                              className={errors.agreeTerms ? "border-destructive" : ""}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="agreeTerms"
                                className={cn(
                                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                  errors.agreeTerms && "text-destructive",
                                )}
                              >
                                I agree to the terms and conditions
                                <span className="text-destructive ml-1">*</span>
                              </label>
                              <p className="text-xs text-muted-foreground">
                                By checking this box, you agree to our{" "}
                                <a href="#" className="text-primary hover:underline">
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:underline">
                                  Privacy Policy
                                </a>
                                .
                              </p>
                              {errors.agreeTerms && <p className="text-xs text-destructive">{errors.agreeTerms}</p>}
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="receiveUpdates"
                              name="receiveUpdates"
                              checked={formData.receiveUpdates}
                              onCheckedChange={(checked) =>
                                handleChange({
                                  target: { name: "receiveUpdates", type: "checkbox", checked },
                                })
                              }
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="receiveUpdates"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Receive updates about products and services
                              </label>
                              <p className="text-xs text-muted-foreground">
                                We'll send you occasional updates about new features, promotions, and shipping tips.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 space-y-4">
                          <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                              </>
                            ) : (
                              "Create account"
                            )}
                          </Button>

                          <Button type="button" variant="outline" onClick={() => setFormStep(0)} className="w-full">
                            Back
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
