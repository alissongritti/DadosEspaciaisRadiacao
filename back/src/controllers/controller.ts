import { Request, Response } from "express";
import db from "./db";

export async function cidade(req: Request, res: Response): Promise<void> {
    try {
        const result = await db.query("SELECT id, nome, ST_AsText(geom) as geom FROM cidades ORDER BY nome ASC");
        res.json(result.rows);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}


export async function buscarCidadePorId(id: string) {
    const result = await db.query(
        'SELECT id, nome, ST_AsText(geom) as geom FROM cidades WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

export async function buscarRadiacaoPorCidadeId(id: string) {
    const result = await db.query(`
        SELECT anual, ST_AsText(geom) as geom
        FROM incidencias
        WHERE id = $1
    `, [id]);
    return result.rows[0];
}

export async function cidadeIncidencia(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        // Buscar cidade pelo ID com geom convertido para texto
        const cidadeResult = await db.query(`
            SELECT 
                id, 
                nome, 
                ST_AsText(geom) as geom 
            FROM cidades 
            WHERE id = $1`,
            [id]
        );

        if (cidadeResult.rows.length === 0) {
            res.status(404).json({ message: `Não existem dados para a cidade com id ${id}` });
            return;
        }

        const cidade = cidadeResult.rows[0];

        // Buscar incidências com geom convertido para texto
        const incidenciasResult = await db.query(
            `SELECT 
                b.id,
                b.lon,
                b.lat,
                b.anual,
                b.jan,
                b.fev,
                b.mar,
                b.abr,
                b.mai,
                b.jun,
                b.jul,
                b.ago,
                b.set,
                b.out,
                b.nov,
                b.dez,
                ST_AsText(b.geom) as geom
             FROM cidades AS a, incidencias AS b 
             WHERE a.id = $1 AND ST_Contains(b.geom, a.geom)`,
            [id]
        );

        // Resposta agrupada com cidade e incidências
        res.json({
            cidade,
            incidencias: incidenciasResult.rows
        });

    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}