import joi from 'joi';

export { validateBodyMiddleware };

async function validateBodyMiddleware(req: Request, schema?: joi.ObjectSchema|undefined) {
    if (!schema) return;

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const body = await req.json();
    const { error, value } = schema.validate(body, options);

    if (error) {
        throw `Validation error: ${error.details.map(x => x.message).join(', ')}`;
    }

    // update req.json() to return sanitized req body
    req.json = () => value;    
}