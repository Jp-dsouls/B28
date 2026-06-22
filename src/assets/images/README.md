# Imágenes del Proyecto B28

## 📁 Estructura de Archivos

```
src/assets/images/
├── escudo b28.png      # Escudo de Bomberos Voluntarios Miraflores
├── logo cgbvp.png      # Logo del Cuerpo General de Bomberos Voluntarios del Perú
└── README.md           # Este archivo
```

## 🎯 Buenas Prácticas Implementadas

### 1. **Optimización de Imágenes**
- ✅ Formato PNG para logos con transparencia
- ✅ Tamaños optimizados para web
- ✅ Lazy loading implementado
- ✅ Fallbacks para errores de carga

### 2. **Accesibilidad**
- ✅ Textos alternativos descriptivos
- ✅ Contraste adecuado en fallbacks
- ✅ Navegación por teclado

### 3. **Responsive Design**
- ✅ **Mobile**: Layout vertical compacto con logos centrados
- ✅ **Tablet**: Layout horizontal medio con espaciado optimizado
- ✅ **Desktop**: Layout horizontal completo con logos grandes
- ✅ Tamaños adaptativos (sm, md, lg) para cada breakpoint
- ✅ Object-fit: contain para mantener proporciones

### 4. **Performance**
- ✅ Lazy loading automático
- ✅ Manejo de errores de carga
- ✅ Optimización de renderizado

## 🚀 Uso del Componente LogoHeader

```vue
<template>
  <!-- Uso básico -->
  <LogoHeader />
  
  <!-- Con tamaño personalizado -->
  <LogoHeader size="lg" />
  
  <!-- Sin texto -->
  <LogoHeader :show-text="false" />
  
  <!-- Con layout específico -->
  <LogoHeader layout="horizontal" />
</template>
```

## 📱 Layouts Responsivos

### **📱 Mobile (< 640px)**
- **Layout**: Vertical compacto
- **Logos**: Centrados horizontalmente
- **Texto**: Centrado debajo de los logos
- **Espaciado**: Mínimo para optimizar espacio

### **📱 Tablet (640px - 1024px)**
- **Layout**: Horizontal medio
- **Logos**: Lado a lado con espaciado optimizado
- **Texto**: Alineado horizontalmente
- **Espaciado**: Balanceado para legibilidad

### **🖥️ Desktop (> 1024px)**
- **Layout**: Horizontal completo
- **Logos**: Tamaño grande con espaciado generoso
- **Texto**: Tamaño grande y prominente
- **Espaciado**: Máximo para impacto visual

## 📏 Tamaños Responsivos Disponibles

### **📱 Mobile (< 640px)**
- **sm**: `w-4 h-4` (16px)
- **md**: `w-6 h-6` (24px) - *Por defecto*
- **lg**: `w-8 h-8` (32px)

### **📱 Tablet (640px - 1024px)**
- **sm**: `sm:w-6 sm:h-6` (24px)
- **md**: `sm:w-8 sm:h-8` (32px) - *Por defecto*
- **lg**: `sm:w-12 sm:h-12` (48px)

### **🖥️ Desktop (> 1024px)**
- **sm**: `lg:w-8 lg:h-8` (32px)
- **md**: `lg:w-12 lg:h-12` (48px) - *Por defecto*
- **lg**: `lg:w-16 lg:h-16` (64px)

## 🔧 Configuración

Las rutas y configuraciones están centralizadas en:
```
src/config/images.ts
```

## 📋 Checklist de Implementación

- [x] Componente LogoHeader creado
- [x] Configuración centralizada
- [x] Manejo de errores
- [x] Fallbacks implementados
- [x] Responsive design
- [x] Accesibilidad
- [x] Performance optimizada

## 🎨 Especificaciones de Diseño

### Escudo B28
- **Formato**: PNG con transparencia
- **Colores**: Rojo, amarillo, azul (colores oficiales)
- **Fallback**: Círculo rojo con "B28"

### Logo CGBVP
- **Formato**: PNG con transparencia
- **Colores**: Rojo, dorado, verde (colores oficiales)
- **Fallback**: Círculo azul con "CGBVP" 