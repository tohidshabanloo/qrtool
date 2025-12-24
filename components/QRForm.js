import { useState } from 'react'

const qrTypes = [
  { value: 'text', label: 'متن' },
  { value: 'link', label: 'لینک' },
  { value: 'email', label: 'ایمیل' },
  { value: 'call', label: 'تماس' },
  { value: 'sms', label: 'پیامک' },
  { value: 'vcard', label: 'V-Card' },
  { value: 'whatsapp', label: 'واتس‌اپ' },
  { value: 'wifi', label: 'وای‌فای' },
  { value: 'pdf', label: 'PDF' },
  { value: 'app', label: 'اپلیکیشن' },
  { value: 'image', label: 'تصویر' },
  { value: 'video', label: 'ویدیو' },
  { value: 'social', label: 'شبکه اجتماعی' },
  { value: 'event', label: 'رویداد' },
  { value: 'barcode', label: 'بارکد 2D' }
]

const frameOptions = [
  { value: 'none', label: 'بدون فریم' },
  { value: 'simple', label: 'ساده' },
  { value: 'rounded', label: 'گرد' },
  { value: 'thick', label: 'ضخیم' },
  { value: 'dotted', label: 'نقطه‌چین' },
  { value: 'double', label: 'دوبل' }
]

const shapeOptions = [
  { value: 'square', label: 'مربع' },
  { value: 'rounded', label: 'گرد' },
  { value: 'circle', label: 'دایره' }
]

export default function QRForm({
  qrType,
  setQrType,
  text,
  setText,
  designOptions,
  setDesignOptions,
  onGenerate,
  onKeyDown,
  isDark
}) {
  const [emailData, setEmailData] = useState({ email: '', subject: '', body: '' })
  const [callData, setCallData] = useState({ phone: '' })
  const [smsData, setSmsData] = useState({ phone: '', message: '' })
  const [vcardData, setVcardData] = useState({ name: '', phone: '', email: '', company: '' })
  const [whatsappData, setWhatsappData] = useState({ phone: '', message: '' })
  const [wifiData, setWifiData] = useState({ ssid: '', security: 'WPA', password: '' })
  const [urlData, setUrlData] = useState({ url: '' })
  const [eventData, setEventData] = useState({ title: '', start: '', end: '', location: '', description: '' })

  const handleDesignChange = (newDesignOptions, shouldRegenerate = true) => {
    setDesignOptions(newDesignOptions)
    if (shouldRegenerate) {
      // Call onGenerate with appropriate data based on current qrType
      if (qrType === 'text') onGenerate(text)
      else if (qrType === 'link') onGenerate(urlData.url)
      else if (qrType === 'email') onGenerate(`mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`)
      else if (qrType === 'call') onGenerate(`tel:${callData.phone}`)
      else if (qrType === 'sms') onGenerate(`sms:${smsData.phone}?body=${encodeURIComponent(smsData.message)}`)
      else if (qrType === 'vcard') onGenerate(`BEGIN:VCARD\nVERSION:3.0\nFN:${vcardData.name}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.company}\nEND:VCARD`)
      else if (qrType === 'whatsapp') onGenerate(`https://wa.me/${whatsappData.phone}?text=${encodeURIComponent(whatsappData.message)}`)
      else if (qrType === 'wifi') {
        const password = wifiData.security === 'nopass' ? '' : wifiData.password
        onGenerate(`WIFI:S:${wifiData.ssid};T:${wifiData.security};P:${password};;`)
      }
      else if (qrType === 'event') onGenerate(`BEGIN:VEVENT\nSUMMARY:${eventData.title}\nDTSTART:${eventData.start.replace(/[-:]/g, '')}\nDTEND:${eventData.end.replace(/[-:]/g, '')}\nLOCATION:${eventData.location}\nDESCRIPTION:${eventData.description}\nEND:VEVENT`)
      else if (qrType === 'barcode') onGenerate(text)
      else onGenerate(urlData.url)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900">
      <label className="block text-sm mb-3 text-gray-600 dark:text-gray-400">نوع QR</label>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {qrTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setQrType(type.value)}
            className={`px-3 py-2 rounded-lg text-sm border transition ${
              qrType === type.value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Design Options Section */}
      <div className="mb-4">
        <div className="space-y-4">
          {/* Design your QR Code */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">طراحی کد QR</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">رنگ پیش‌زمینه</label>
                <input
                  type="color"
                  value={designOptions.fgColor || (isDark ? '#e5e7eb' : '#111827')}
                  onChange={(e) => handleDesignChange({ ...designOptions, fgColor: e.target.value })}
                  className="w-full h-8 rounded border border-gray-300 dark:border-white/10"
                />
              </div>
              <div>
                <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">رنگ پس‌زمینه</label>
                <input
                  type="color"
                  value={designOptions.bgColor || (isDark ? '#0b1220' : '#ffffff')}
                  onChange={(e) => handleDesignChange({ ...designOptions, bgColor: e.target.value })}
                  className="w-full h-8 rounded border border-gray-300 dark:border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Frame */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">فریم</label>
            <div className="grid grid-cols-4 gap-2">
              {frameOptions.map((frame) => (
                <button
                  key={frame.value}
                  onClick={() => handleDesignChange({ ...designOptions, frame: frame.value })}
                  className={`px-3 py-2 rounded-lg text-sm border transition ${
                    designOptions.frame === frame.value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {frame.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shape */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">شکل</label>
            <div className="grid grid-cols-3 gap-2">
              {shapeOptions.map((shape) => (
                <button
                  key={shape.value}
                  onClick={() => handleDesignChange({ ...designOptions, shape: shape.value })}
                  className={`px-3 py-2 rounded-lg text-sm border transition ${
                    designOptions.shape === shape.value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">لوگو</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (e) => handleDesignChange({ ...designOptions, logo: e.target.result })
                  reader.readAsDataURL(file)
                }
              }}
              className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
            />
            {designOptions.logo && (
              <div className="mt-2">
                <img src={designOptions.logo} alt="Logo preview" className="w-16 h-16 object-contain border border-gray-200 dark:border-white/10 rounded" />
              </div>
            )}
          </div>
        </div>
      </div>

      {qrType === 'text' && (
        <div>
          <label htmlFor="text-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">متن</label>
          <div className="flex gap-2">
            <input
              id="text-input"
              dir="ltr"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="هر متنی"
              className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => onGenerate(text)}
              className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
            >
              تولید
            </button>
          </div>
        </div>
      )}

      {qrType === 'link' && (
        <div>
          <label htmlFor="link-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">لینک</label>
          <div className="flex gap-2">
            <input
              id="link-input"
              dir="ltr"
              type="url"
              value={urlData.url}
              onChange={(e) => setUrlData({ ...urlData, url: e.target.value })}
              onKeyDown={onKeyDown}
              placeholder="https://example.com"
              className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => onGenerate(urlData.url)}
              className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
            >
              تولید
            </button>
          </div>
        </div>
      )}

      {qrType === 'email' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="email-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">ایمیل</label>
            <input
              id="email-input"
              dir="ltr"
              type="email"
              value={emailData.email}
              onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="subject-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">موضوع</label>
            <input
              id="subject-input"
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="موضوع ایمیل"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="body-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">متن</label>
            <textarea
              id="body-input"
              value={emailData.body}
              onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
              placeholder="متن ایمیل"
              rows={3}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => onGenerate(`mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`)}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {qrType === 'call' && (
        <div>
          <label htmlFor="call-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">شماره تلفن</label>
          <div className="flex gap-2">
            <input
              id="call-input"
              dir="ltr"
              type="tel"
              value={callData.phone}
              onChange={(e) => setCallData({ ...callData, phone: e.target.value })}
              placeholder="+989123456789"
              className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => onGenerate(`tel:${callData.phone}`)}
              className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
            >
              تولید
            </button>
          </div>
        </div>
      )}

      {qrType === 'sms' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="sms-phone-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">شماره تلفن</label>
            <input
              id="sms-phone-input"
              dir="ltr"
              type="tel"
              value={smsData.phone}
              onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
              placeholder="+989123456789"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="sms-message-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">پیام</label>
            <textarea
              id="sms-message-input"
              value={smsData.message}
              onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
              placeholder="متن پیام"
              rows={3}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => onGenerate(`sms:${smsData.phone}?body=${encodeURIComponent(smsData.message)}`)}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {qrType === 'vcard' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="vcard-name-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">نام کامل</label>
            <input
              id="vcard-name-input"
              type="text"
              value={vcardData.name}
              onChange={(e) => setVcardData({ ...vcardData, name: e.target.value })}
              placeholder="نام و نام خانوادگی"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="vcard-phone-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">شماره تلفن</label>
            <input
              id="vcard-phone-input"
              dir="ltr"
              type="tel"
              value={vcardData.phone}
              onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
              placeholder="+989123456789"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="vcard-email-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">ایمیل</label>
            <input
              id="vcard-email-input"
              dir="ltr"
              type="email"
              value={vcardData.email}
              onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="vcard-company-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">شرکت</label>
            <input
              id="vcard-company-input"
              type="text"
              value={vcardData.company}
              onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
              placeholder="نام شرکت"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => onGenerate(`BEGIN:VCARD\nVERSION:3.0\nFN:${vcardData.name}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.company}\nEND:VCARD`)}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {qrType === 'whatsapp' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="whatsapp-phone-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">شماره تلفن</label>
            <input
              id="whatsapp-phone-input"
              dir="ltr"
              type="tel"
              value={whatsappData.phone}
              onChange={(e) => setWhatsappData({ ...whatsappData, phone: e.target.value })}
              placeholder="989123456789"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="whatsapp-message-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">پیام</label>
            <textarea
              id="whatsapp-message-input"
              value={whatsappData.message}
              onChange={(e) => setWhatsappData({ ...whatsappData, message: e.target.value })}
              placeholder="پیام واتس‌اپ"
              rows={3}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => onGenerate(`https://wa.me/${whatsappData.phone}?text=${encodeURIComponent(whatsappData.message)}`)}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {qrType === 'wifi' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="wifi-ssid-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">نام شبکه (SSID)</label>
            <input
              id="wifi-ssid-input"
              type="text"
              value={wifiData.ssid}
              onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
              placeholder="نام وای‌فای"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="wifi-security-select" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">نوع امنیتی</label>
            <select
              id="wifi-security-select"
              value={wifiData.security}
              onChange={(e) => setWifiData({ ...wifiData, security: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">بدون رمز</option>
            </select>
          </div>
          {wifiData.security !== 'nopass' && (
            <div>
              <label htmlFor="wifi-password-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">رمز عبور</label>
              <input
                id="wifi-password-input"
                type="password"
                value={wifiData.password}
                onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                placeholder="رمز وای‌فای"
                className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}
          <button
            onClick={() => {
              const password = wifiData.security === 'nopass' ? '' : wifiData.password
              onGenerate(`WIFI:S:${wifiData.ssid};T:${wifiData.security};P:${password};;`)
            }}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {(qrType === 'pdf' || qrType === 'app' || qrType === 'image' || qrType === 'video' || qrType === 'social') && (
        <div>
          <label htmlFor={`${qrType}-url-input`} className="block text-sm mb-2 text-gray-600 dark:text-gray-400">
            {qrType === 'pdf' && 'لینک PDF'}
            {qrType === 'app' && 'لینک اپلیکیشن'}
            {qrType === 'image' && 'لینک تصویر'}
            {qrType === 'video' && 'لینک ویدیو'}
            {qrType === 'social' && 'لینک شبکه اجتماعی'}
          </label>
          <div className="flex gap-2">
            <input
              id={`${qrType}-url-input`}
              dir="ltr"
              type="url"
              value={urlData.url}
              onChange={(e) => setUrlData({ ...urlData, url: e.target.value })}
              placeholder="https://example.com/file"
              className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => onGenerate(urlData.url)}
              className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
            >
              تولید
            </button>
          </div>
        </div>
      )}

      {qrType === 'event' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="event-title-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">عنوان رویداد</label>
            <input
              id="event-title-input"
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="نام رویداد"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="event-start-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">تاریخ شروع</label>
            <input
              id="event-start-input"
              dir="ltr"
              type="datetime-local"
              value={eventData.start}
              onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="event-end-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">تاریخ پایان</label>
            <input
              id="event-end-input"
              dir="ltr"
              type="datetime-local"
              value={eventData.end}
              onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="event-location-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">مکان</label>
            <input
              id="event-location-input"
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              placeholder="آدرس رویداد"
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="event-description-input" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">توضیحات</label>
            <textarea
              id="event-description-input"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              placeholder="توضیحات رویداد"
              rows={2}
              className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={() => onGenerate(`BEGIN:VEVENT\nSUMMARY:${eventData.title}\nDTSTART:${eventData.start.replace(/[-:]/g, '')}\nDTEND:${eventData.end.replace(/[-:]/g, '')}\nLOCATION:${eventData.location}\nDESCRIPTION:${eventData.description}\nEND:VEVENT`)}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
          >
            تولید
          </button>
        </div>
      )}

      {qrType === 'barcode' && (
        <div>
          <label htmlFor="barcode-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">داده‌ها</label>
          <div className="flex gap-2">
            <input
              id="barcode-input"
              dir="ltr"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="هر داده‌ای"
              className="flex-1 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 px-3 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={() => onGenerate(text)}
              className="shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 transition"
            >
              تولید
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">با Enter هم تولید میشود</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">بارکدهای ایجاد شده دائمی است و تحت هیچ شرایطی منقضی نمی‌شود.</p>
    </div>
  )
}
