import fs from 'node:fs';
import path from 'node:path';

interface ProcessedEvent {
  id: string;
  processedAt: string;
  customerEmail?: string;
}

const CACHE_FILE = process.env.VERCEL
  ? path.join('/tmp', '.webhook_events.json')
  : path.join(process.cwd(), '.webhook_events.json');

class IdempotencyManager {
  private processedEvents: Map<string, ProcessedEvent> = new Map();

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
        const list: ProcessedEvent[] = JSON.parse(raw);
        if (Array.isArray(list)) {
          for (const item of list) {
            this.processedEvents.set(item.id, item);
          }
        }
      }
    } catch (err) {
      console.warn('[Idempotency] Não foi possível carregar cache de eventos:', err);
    }
  }

  private saveToDisk() {
    try {
      const list = Array.from(this.processedEvents.values()).slice(-500); // Mantém os últimos 500 eventos
      fs.writeFileSync(CACHE_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[Idempotency] Não foi possível persistir cache de eventos:', err);
    }
  }

  /**
   * Verifica se o ID do evento ou da cobrança já foi processado anteriormente.
   */
  public has(id: string): boolean {
    return this.processedEvents.has(id);
  }

  /**
   * Marca o ID como processado e persiste o registro.
   */
  public markAsProcessed(id: string, customerEmail?: string) {
    this.processedEvents.set(id, {
      id,
      processedAt: new Date().toISOString(),
      customerEmail,
    });
    this.saveToDisk();
  }

  /**
   * Retorna os dados do evento processado
   */
  public get(id: string): ProcessedEvent | undefined {
    return this.processedEvents.get(id);
  }
}

export const idempotency = new IdempotencyManager();
