-- AlterTable
CREATE SEQUENCE eventlocation_id_seq;
ALTER TABLE "EventLocation" ALTER COLUMN "id" SET DEFAULT nextval('eventlocation_id_seq');
ALTER SEQUENCE eventlocation_id_seq OWNED BY "EventLocation"."id";
