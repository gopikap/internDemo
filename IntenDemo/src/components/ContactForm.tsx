// Concepts demonstrated: State, Forms, Event Handling, Validation

import { useState } from 'react'
import FormInput from './FormInput'
import Button from './Button'

interface ContactData {
  name: string
  email: string
  subject: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactData, string>>

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)

  // One handler for both <input> and <textarea>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const next: ContactErrors = {}
    if (!formData.name.trim()) next.name = 'Name is required'
    if (!formData.email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email address'
    }
    if (!formData.subject.trim()) next.subject = 'Subject is required'
    if (!formData.message.trim()) {
      next.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSent(true)
    // Reset after showing the success message
    setTimeout(() => {
      setSent(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <section className="section contact-section">
      <h2 className="section-title">Contact Me</h2>

      {sent && (
        <div className="status-msg success" style={{ marginBottom: '1.5rem' }}>
          Message sent! I will get back to you soon.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <FormInput
            id="c-name"
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            error={errors.name}
          />

          <FormInput
            id="c-email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            error={errors.email}
          />
        </div>

        <FormInput
          id="c-subject"
          label="Subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          error={errors.subject}
        />

        <div className="form-group">
          <label htmlFor="c-message">Message</label>
          <textarea
            id="c-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here... (min 10 characters)"
            rows={5}
            className={errors.message ? 'input-error' : ''}
          />
          {errors.message && <span className="error-msg">{errors.message}</span>}
        </div>

        <Button type="submit">
          Send Message
        </Button>
      </form>
    </section>
  )
}

export default ContactForm
