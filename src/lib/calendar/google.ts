export interface CalendarEventPayload {
  summary: string;
  description: string;
  location?: string;
  startDateTime: string; // ISO String
  endDateTime: string;   // ISO String
  attendeeEmail?: string;
}

export class GoogleCalendarService {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID || '';
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  }

  async createEvent(
    accessToken: string,
    payload: CalendarEventPayload
  ): Promise<{ success: boolean; eventId?: string; error?: string }> {
    if (!accessToken || accessToken === 'placeholder-token') {
      console.log(`[Google Calendar Mock Event] ${payload.summary} from ${payload.startDateTime}`);
      return { success: true, eventId: `gcal-mock-${Date.now()}` };
    }

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary: payload.summary,
            description: payload.description,
            location: payload.location,
            start: { dateTime: payload.startDateTime },
            end: { dateTime: payload.endDateTime },
            attendees: payload.attendeeEmail ? [{ email: payload.attendeeEmail }] : []
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Calendar API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { success: true, eventId: data.id };
    } catch (err: any) {
      console.error('Google Calendar Event Creation Failed:', err.message);
      return { success: false, error: err.message };
    }
  }

  async deleteEvent(
    accessToken: string,
    eventId: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!accessToken || accessToken === 'placeholder-token' || eventId.startsWith('gcal-mock')) {
      console.log(`[Google Calendar Mock Delete] Event ID: ${eventId}`);
      return { success: true };
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      if (!response.ok && response.status !== 410) {
        throw new Error(`Google Calendar Delete Error ${response.status}`);
      }

      return { success: true };
    } catch (err: any) {
      console.error('Google Calendar Delete Failed:', err.message);
      return { success: false, error: err.message };
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();
