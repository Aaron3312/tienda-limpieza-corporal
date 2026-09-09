import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import type { Pedido } from '@/types';

/**
 * Pedidos de la clienta con sesión. firestore.rules sólo deja pasar la
 * consulta filtrada por su propio uid; se ordena aquí para no requerir un
 * índice compuesto.
 */
export async function getMisPedidos(uid: string): Promise<Pedido[]> {
  const consulta = query(collection(firestore, 'pedidos'), where('uid', '==', uid));
  const snapshot = await getDocs(consulta);
  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Pedido)
    .sort((a, b) => (a.creadoEn < b.creadoEn ? 1 : -1));
}
