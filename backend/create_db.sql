create user gen_ai_reflection with createdb password 'gen_ai_reflection';
create database gen_ai_reflection;
grant all on database gen_ai_reflection to gen_ai_reflection;
GRANT ALL ON SCHEMA public to gen_ai_reflection;

ALTER DATABASE gen_ai_reflection OWNER TO gen_ai_reflection;
