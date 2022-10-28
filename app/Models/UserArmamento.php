<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserArmamento extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_armamentos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['subunidade', 'armamentos', 'user', 'armeiro'];

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function armamentos()
    {
        //return $this->hasMany(ArmamentoItem::class, '');
        return $this->belongsToMany(Armamento::class, 'armamentos_itens', 'user_armamento_id', 'armamento_id')->withPivot('id', 'quant', 'carregadores', 'danificado', 'extraviado');
    }

     public function user()
    {
        return $this->belongsTo(User::class)->without(['perfil', 'subunidade']);
    }

    public function armeiro()
    {
        return $this->belongsTo(User::class, 'created_by')->without(['perfil', 'subunidade']);
    }
}
