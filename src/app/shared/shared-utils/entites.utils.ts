import { extractKeys } from './entries.utils';

type ID = number | string;
type WithId = { id: ID };
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// Add an entity to an array of entities of the same type
export const addEntityToArray = <T>(entities: T[], entity: T, end: boolean = true) => (end ? entities.concat(entity) : [entity].concat(entities));
// Update entity in an array of entities
export const updateEntityWithIdInArray = <T extends WithId>(entities: T[], updatedEntity: T) => {
  return entities.map((entity) => (entity.id === updatedEntity.id ? { ...entity, ...updatedEntity } : entity));
};
export const updateEntityInArray = <T extends object>(entities: T[], updatedEntity: T, match: (entity: T) => boolean) => {
  return entities.map((entity) => (match(entity) ? { ...entity, ...updatedEntity } : entity));
};
// Update some of the entity attributes in an array of the same entities
export const patchEntityWithIdInArray = <T extends WithId>(entities: T[], outdatedEntityId: T['id'], attributes: Partial<Omit<T, 'id'>>) => {
  return entities.map((entity) => (entity.id === outdatedEntityId ? { ...entity, ...attributes, id: entity.id } : entity));
};
export const patchEntityInArray = <T extends object>(entities: T[], attributes: Partial<T>, match: (entity: T) => boolean) => {
  return entities.map((entity) => (match(entity) ? { ...entity, ...attributes } : entity));
};
export const patchEntityRecursivelyInArray = <T extends object>(entities: T[], attributes: RecursivePartial<T>, match: (entity: T) => boolean) => {
  return entities.map((entity) => (match(entity) ? patchEntityRecursively(entity, attributes) : entity));
};
// Delete entity from an array of entities of the same type
export const deleteEntityWithIdFromArray = <T extends WithId>(entities: T[], entityToDelete: T) => entities.filter((entity) => entity.id !== entityToDelete.id);
export const deleteEntityByIdFromArray = <T extends WithId>(entities: T[], entityId: ID) => entities.filter((entity) => entity.id !== entityId);
export const deleteEntityInArray = <T>(entities: T[], match: (entity: T) => boolean) => entities.filter((entity) => !match(entity));
// Replace an entity in an array of the same entities
export const replaceEntityWithIdInArray = <T extends WithId>(entities: T[], id: T['id'], replacement: T) => {
  return entities.map((entity) => (entity.id === id ? replacement : entity));
};
export const replaceEntityInArray = <T>(entities: T[], replacement: T, match: (entity: T) => boolean) => {
  return entities.map((entity) => (match(entity) ? replacement : entity));
};

// Update an entity in an immutable way
export const updateEntity = <T extends object>(outdatedEntity: T, updatedEntity: T) => ({ ...outdatedEntity, ...updatedEntity });
// Patch an entity in an immutable way
export const patchEntity = <T extends object>(outdatedEntity: T, attributes: Partial<T>) => ({ ...outdatedEntity, ...attributes });
// Patch an entity recursively
export const patchEntityRecursively = <T>(entity: T, attributes: RecursivePartial<T>) => {
  return {
    ...entity,
    ...extractKeys(attributes).reduce((acc, property) => {
      if (entity[property] !== undefined && typeof attributes[property] === 'object' && attributes[property] !== null && !Array.isArray(attributes[property])) {
        acc[property] = patchEntityRecursively(entity[property], attributes[property]!);
      }
      return acc;
    }, attributes),
  };
};
