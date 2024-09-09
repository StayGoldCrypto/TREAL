use serde::Serialize;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use std::env;  // Para manejar parámetros de línea de comandos
use walkdir::WalkDir;
use ignore::WalkBuilder;

#[derive(Serialize)]
struct FileEntry {
    path: String,
    is_dir: bool,
}

fn main() {
    // Captura los parámetros de la línea de comandos
    let args: Vec<String> = env::args().collect();
    
    // Verificar si los parámetros fueron proporcionados
    if args.len() != 3 {
        eprintln!("Uso: {} <subdirectorio> <archivo_salida>", args[0]);
        std::process::exit(1);
    }

    // Asignar los parámetros a variables
    let subdir = &args[1];  // Primer parámetro: subdirectorio
    let output_file = &args[2];  // Segundo parámetro: archivo de salida

    // Llamar a la función de procesamiento
    let entries = process_directory(subdir, output_file);
    println!("Total de archivos procesados: {}", entries.len());
}

fn process_directory<P: AsRef<Path>>(subdir: P, output_file: &str) -> Vec<FileEntry> {
    // Cargar el archivo .gitignore si está presente
    let mut builder = WalkBuilder::new(subdir);
    // builder.add_ignore([[false); // Usa .gitignore
    builder.add_ignore(".gitignore"); // Usa .gitignore
    let walker = builder.build();

    // Vector que contendrá las entradas de los archivos
    let mut entries = Vec::new();

    // Procesar cada archivo y directorio
    for entry in walker {
        match entry {
            Ok(entry) => {
                let path = entry.path();
                let is_dir = path.is_dir();

                // Mensaje de procesamiento
                println!("Procesando: {}", path.display());

                // Agregar al vector de resultados
                entries.push(FileEntry {
                    path: path.display().to_string(),
                    is_dir,
                });
            }
            Err(e) => println!("Error procesando archivo: {}", e),
        }
    }

    // Serializar a JSON y guardar en el archivo de salida
    let json = serde_json::to_string_pretty(&entries).expect("Error serializando a JSON");
    let mut file = File::create(output_file).expect("No se pudo crear el archivo de salida");
    file.write_all(json.as_bytes())
        .expect("No se pudo escribir en el archivo");

    entries
}

/*
use walkdir::WalkDir;
use serde::Serialize;
use std::fs::File;
use std::io::Write;
//use std::path::Path;
use std::env;

#[derive(Serialize)]
struct FileEntry {
    path: String,
    size: u64,
}

fn main() -> std::io::Result<()> {
    // Lee los argumentos de línea de comandos
    let args: Vec<String> = env::args().collect();
    
    if args.len() != 3 {
        eprintln!("Uso: {} <subdirectorio> <archivo_salida.json>", args[0]);
        std::process::exit(1);
    }

    let subdir = &args[1];
    let output_file = &args[2];

    // Vector para almacenar los archivos encontrados
    let mut files = Vec::new();

    // Recorre el subdirectorio y agrega los archivos al vector
    for entry in WalkDir::new(subdir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        
        // Solo registra los archivos, no los directorios
        if path.is_file() {
            // Obtén el tamaño del archivo
            let metadata = path.metadata()?;
            let size = metadata.len();

            // Crea una entrada del archivo con su ruta y tamaño
            files.push(FileEntry {
                path: path.display().to_string(),
                size,
            });
        }
    }

    // Serializa el vector en JSON
    let json_data = serde_json::to_string_pretty(&files)?;

    // Escribe el JSON en un archivo
    let mut file = File::create(output_file)?;
    file.write_all(json_data.as_bytes())?;

    println!("Lista de archivos registrada en '{}'", output_file);

    Ok(())
}
*/

/*
use walkdir::WalkDir;
use serde::Serialize;
use std::fs::File;
use std::io::Write;
use std::path::Path;

#[derive(Serialize)]
struct FileEntry {
    path: String,
    size: u64,
}

fn main() -> std::io::Result<()> {
    let subdir = "./your_subdirectory";  // Cambia este valor por el subdirectorio que quieres analizar
    let output_file = "file_list.json";  // Archivo de salida JSON

    // Vector para almacenar los archivos encontrados
    let mut files = Vec::new();

    // Recorre el subdirectorio y agrega los archivos al vector
    for entry in WalkDir::new(subdir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        
        // Solo registra los archivos, no los directorios
        if path.is_file() {
            // Obtén el tamaño del archivo
            let metadata = path.metadata()?;
            let size = metadata.len();

            // Crea una entrada del archivo con su ruta y tamaño
            files.push(FileEntry {
                path: path.display().to_string(),
                size,
            });
        }
    }

    // Serializa el vector en JSON
    let json_data = serde_json::to_string_pretty(&files)?;

    // Escribe el JSON en un archivo
    let mut file = File::create(output_file)?;
    file.write_all(json_data.as_bytes())?;

    println!("Lista de archivos registrada en '{}'", output_file);

    Ok(())
}
*/