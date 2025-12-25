import { useState } from 'react'

const qrTypes = [
  { value: 'link', label: 'لینک', icon: '🔗' },
  { value: 'text', label: 'متن', icon: '📝' },
  { value: 'email', label: 'ایمیل', icon: '✉️' },
  { value: 'call', label: 'تماس', icon: '📞' },
  { value: 'sms', label: 'پیامک', icon: '💬' },
  { value: 'vcard', label: 'V-Card', icon: '👤' },
  { value: 'whatsapp', label: 'واتس‌اپ', icon: '📱' },
  { value: 'wifi', label: 'وای‌فای', icon: '📶' },
  { value: 'pdf', label: 'PDF', icon: '📄' },
  { value: 'app', label: 'اپلیکیشن', icon: '📲' },
  { value: 'image', label: 'تصویر', icon: '🖼️' },
  { value: 'video', label: 'ویدیو', icon: '🎥' },
  { value: 'social', label: 'شبکه اجتماعی', icon: '🌐' },
  { value: 'event', label: 'رویداد', icon: '📅' },
  { value: 'barcode', label: 'بارکد 2D', icon: '▦' }
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
  const [activeDesignTab, setActiveDesignTab] = useState('frame')
  const [logoFileName, setLogoFileName] = useState('')

  const handleDesignChange = (newDesignOptions, shouldRegenerate = true) => {
    setDesignOptions(newDesignOptions)
    if (shouldRegenerate) {
      // Call onGenerate with appropriate data based on current qrType, passing newDesignOptions
      if (qrType === 'text') onGenerate(text, newDesignOptions)
      else if (qrType === 'link') onGenerate(urlData.url, newDesignOptions)
      else if (qrType === 'email') onGenerate(`mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`, newDesignOptions)
      else if (qrType === 'call') onGenerate(`tel:${callData.phone}`, newDesignOptions)
      else if (qrType === 'sms') onGenerate(`sms:${smsData.phone}?body=${encodeURIComponent(smsData.message)}`, newDesignOptions)
      else if (qrType === 'vcard') onGenerate(`BEGIN:VCARD\nVERSION:3.0\nFN:${vcardData.name}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.company}\nEND:VCARD`, newDesignOptions)
      else if (qrType === 'whatsapp') onGenerate(`https://wa.me/${whatsappData.phone}?text=${encodeURIComponent(whatsappData.message)}`, newDesignOptions)
      else if (qrType === 'wifi') {
        const password = wifiData.security === 'nopass' ? '' : wifiData.password
        onGenerate(`WIFI:S:${wifiData.ssid};T:${wifiData.security};P:${password};;`, newDesignOptions)
      }
      else if (qrType === 'event') onGenerate(`BEGIN:VEVENT\nSUMMARY:${eventData.title}\nDTSTART:${eventData.start.replace(/[-:]/g, '')}\nDTEND:${eventData.end.replace(/[-:]/g, '')}\nLOCATION:${eventData.location}\nDESCRIPTION:${eventData.description}\nEND:VEVENT`, newDesignOptions)
      else if (qrType === 'barcode') onGenerate(text, newDesignOptions)
      else onGenerate(urlData.url, newDesignOptions)
    }
  }

  return (
    <div className="space-y-6">
      {/* QR Type Selection */}
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {qrTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setQrType(type.value)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm border transition flex items-center gap-2 justify-center ${qrType === type.value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                }`}
            >
              <span className="text-base">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Complete the content */}
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">تکمیل محتوا</h2>
        </div>

        {qrType === 'text' && (
          <div>
            <label htmlFor="text-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">متن خود را وارد کنید</label>
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
            <label htmlFor="link-input" className="block text-sm mb-2 text-gray-600 dark:text-gray-400">آدرس وب‌سایت خود را وارد کنید</label>
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
      </div>

      {/* Section 2: Design your QR Code */}
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 md:p-6 shadow-soft bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">طراحی کد QR</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-white/10">
          <button
            onClick={() => setActiveDesignTab('frame')}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${activeDesignTab === 'frame'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
          >
            فریم
          </button>
          <button
            onClick={() => setActiveDesignTab('shape')}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${activeDesignTab === 'shape'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
          >
            شکل
          </button>
          <button
            onClick={() => setActiveDesignTab('logo')}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${activeDesignTab === 'logo'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
          >
            لوگو
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeDesignTab === 'frame' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {frameOptions.map((frame) => (
                  <button
                    key={frame.value}
                    onClick={() => handleDesignChange({ ...designOptions, frame: frame.value })}
                    className={`px-3 py-2 rounded-lg text-sm border transition ${designOptions.frame === frame.value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {frame.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">رنگ پیش‌زمینه</label>
                  <input
                    type="color"
                    value={designOptions.fgColor || (isDark ? '#e5e7eb' : '#111827')}
                    onChange={(e) => handleDesignChange({ ...designOptions, fgColor: e.target.value })}
                    className="w-full h-10 rounded border border-gray-300 dark:border-white/10 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 text-gray-500 dark:text-gray-400">رنگ پس‌زمینه</label>
                  <input
                    type="color"
                    value={designOptions.bgColor || (isDark ? '#0b1220' : '#ffffff')}
                    onChange={(e) => handleDesignChange({ ...designOptions, bgColor: e.target.value })}
                    className="w-full h-10 rounded border border-gray-300 dark:border-white/10 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeDesignTab === 'shape' && (
            <div className="grid grid-cols-3 gap-2">
              {shapeOptions.map((shape) => (
                <button
                  key={shape.value}
                  onClick={() => handleDesignChange({ ...designOptions, shape: shape.value })}
                  className={`px-3 py-2 rounded-lg text-sm border transition ${designOptions.shape === shape.value
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          )}

          {activeDesignTab === 'logo' && (
            <div>
              <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">آپلود لوگو</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                      setLogoFileName(file.name)
                      const reader = new FileReader()
                      reader.onload = (e) => handleDesignChange({ ...designOptions, logo: e.target.result })
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {logoFileName || 'انتخاب فایل'}
                  </span>
                </label>
              </div>
              {designOptions.logo && (
                <div className="mt-3 flex items-center gap-3">
                  <img src={designOptions.logo} alt="پیش‌نمایش لوگو" className="w-16 h-16 object-contain border border-gray-200 dark:border-white/10 rounded" />
                  <button
                    onClick={() => {
                      setLogoFileName('')
                      handleDesignChange({ ...designOptions, logo: null })
                    }}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    حذف لوگو
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">با Enter هم تولید می‌شود • بارکدهای ایجاد شده دائمی است</p>
    </div>
  )
}
